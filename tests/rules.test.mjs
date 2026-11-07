// Firestore security-rules tests for Gyanu Notes — covers the abuse-resistance
// rules from firestore.rules: signed-in feedback, verified-email comments,
// no self-reporting, and no self-granted admin.
//
// Run from the repository root (Node 24+ and a JRE on PATH for the emulator):
//   npm --prefix tests install
//   npx firebase-tools emulators:exec --project demo-gyanu-notes --only firestore "node --test tests/rules.test.mjs"
//
// emulators:exec starts the Firestore emulator that
// @firebase/rules-unit-testing connects to; the demo- project id keeps every
// read/write local (nothing touches gyanu-notes-6f6d8).

import { test, after } from "node:test";
import { readFile } from "node:fs/promises";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds
} from "@firebase/rules-unit-testing";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const testEnv = await initializeTestEnvironment({
  projectId: "demo-gyanu-notes",
  firestore: {
    rules: await readFile(new URL("../firestore.rules", import.meta.url), "utf8")
  }
});

after(async () => {
  await testEnv.cleanup();
});

function feedbackPayload(uid) {
  return {
    noteId: "c12-phy-01",
    slug: "c12-phy-01",
    vote: "up",
    uid,
    submittedAt: serverTimestamp()
  };
}

function commentPayload(uid) {
  return {
    noteId: "c12-phy-01",
    uid,
    displayName: "Student",
    text: "Which derivation is asked the most?",
    createdAt: serverTimestamp(),
    reported: false
  };
}

test("feedback: anonymous create is denied, signed-in create succeeds", async () => {
  const anon = testEnv.unauthenticatedContext();
  await assertFails(
    setDoc(doc(anon.firestore(), "feedback", "anon-vote"), feedbackPayload(null))
  );

  const user = testEnv.authenticatedContext("user-feedback", {
    email: "feedback@example.com",
    email_verified: true
  });
  await assertSucceeds(
    setDoc(doc(user.firestore(), "feedback", "user-feedback-vote"), feedbackPayload("user-feedback"))
  );
});

test("feedback: field allow-list still enforced for signed-in users", async () => {
  const user = testEnv.authenticatedContext("user-fields", {
    email: "fields@example.com",
    email_verified: true
  });
  // Extra key outside the allow-list → denied.
  await assertFails(
    setDoc(doc(user.firestore(), "feedback", "user-fields-vote"), Object.assign(
      feedbackPayload("user-fields"),
      { isAdmin: true }
    ))
  );
  // Wrong vote value → denied.
  await assertFails(
    setDoc(doc(user.firestore(), "feedback", "user-fields-vote-2"), Object.assign(
      feedbackPayload("user-fields"),
      { vote: "sideways" }
    ))
  );
});

test("comments: create denied for an unverified (or anonymous) author, allowed when verified", async () => {
  const anon = testEnv.unauthenticatedContext();
  await assertFails(
    setDoc(doc(anon.firestore(), "comments", "c-anon"), commentPayload(null))
  );

  const unverified = testEnv.authenticatedContext("user-unverified", {
    email: "unverified@example.com",
    email_verified: false
  });
  await assertFails(
    setDoc(doc(unverified.firestore(), "comments", "c-unverified"), commentPayload("user-unverified"))
  );

  const verified = testEnv.authenticatedContext("user-verified", {
    email: "verified@example.com",
    email_verified: true
  });
  await assertSucceeds(
    setDoc(doc(verified.firestore(), "comments", "c-verified"), commentPayload("user-verified"))
  );
});

test("comments: author cannot report their own comment; another signed-in user can", async () => {
  const author = testEnv.authenticatedContext("author-1", {
    email: "author@example.com",
    email_verified: true
  });
  await assertSucceeds(
    setDoc(doc(author.firestore(), "comments", "c-own"), commentPayload("author-1"))
  );

  // Owner flagging their own comment → denied.
  await assertFails(
    updateDoc(doc(author.firestore(), "comments", "c-own"), { reported: true })
  );

  // Someone else flagging it → allowed, and only the reported flag changes.
  const flagger = testEnv.authenticatedContext("flagger-1", {
    email: "flagger@example.com",
    email_verified: true
  });
  await assertSucceeds(
    updateDoc(doc(flagger.firestore(), "comments", "c-own"), { reported: true })
  );
  // Overwriting the text while flagging → denied (affectedKeys allow-list).
  await assertFails(
    updateDoc(doc(flagger.firestore(), "comments", "c-own"), { reported: true, text: "edited" })
  );
});

test("users: email must equal auth token email", async () => {
  const alice = testEnv.authenticatedContext("alice2", {
    email: "alice2@example.com",
    email_verified: true
  });
  const profile = {
    name: "Alice",
    classLevel: "12",
    email: "alice2@example.com",
    createdAt: new Date().toISOString()
  };
  await assertSucceeds(setDoc(doc(alice.firestore(), "users", "alice2"), profile));
  // forged email → denied
  await assertFails(updateDoc(doc(alice.firestore(), "users", "alice2"), { email: "other@example.com" }));
  // case mismatch → denied
  await assertFails(updateDoc(doc(alice.firestore(), "users", "alice2"), { email: "ALICE2@example.com" }));
});

test("feedback: create succeeds without slug", async () => {
  const user = testEnv.authenticatedContext("user-noslug", {
    email: "noslug@example.com",
    email_verified: true
  });
  const payload = {
    noteId: "c12-phy-01",
    vote: "up",
    uid: "user-noslug",
    submittedAt: serverTimestamp()
  };
  await assertSucceeds(setDoc(doc(user.firestore(), "feedback", "user-noslug-vote"), payload));
});
  const alice = testEnv.authenticatedContext("alice", {
    email: "alice@example.com",
    email_verified: true
  });
  const profile = {
    name: "Alice",
    classLevel: "12",
    email: "alice@example.com",
    createdAt: new Date().toISOString()
  };

  // Creating the profile with an admin key → denied (create allow-list).
  await assertFails(
    setDoc(doc(alice.firestore(), "users", "alice"), Object.assign({ admin: true }, profile))
  );
  // A clean create → allowed.
  await assertSucceeds(setDoc(doc(alice.firestore(), "users", "alice"), profile));
  // Adding admin afterwards → denied (update allow-list: name/classLevel/email).
  await assertFails(updateDoc(doc(alice.firestore(), "users", "alice"), { admin: true }));
  // A normal edit still works.
  await assertSucceeds(updateDoc(doc(alice.firestore(), "users", "alice"), { name: "Alice B" }));
});
