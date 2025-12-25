// ==================== CTEVT NOTES DATABASE ====================

const ctevtDatabase = {
    // Health Assistant Program
    ha: {
        programName: 'Health Assistant (HA)',
        programIcon: 'fas fa-heartbeat',
        year1: {
            yearName: '1st Year',
            subjects: {
                physics: [
                    {
                        id: 'ha1p1',
                        title: 'Chapter 1: Mechanics and Motion',
                        description: 'Introduction to mechanics, motion, force, and Newton\'s laws',
                        topics: ['Motion', 'Force', 'Newton\'s Laws', 'Work & Energy'],
                        viewLink: 'note-detail.html?id=ha1p1',
                        lastUpdated: '2024-01-15',
                        readTime: 18,
                        content: `
                            <h2>1. Mechanics and Motion</h2>
                            
                            <h3>1.1 Introduction to Mechanics</h3>
                            <p>Mechanics is the branch of physics that deals with the motion of objects and the forces that cause motion. It is fundamental to understanding how the physical world works.</p>
                            
                            <h3>1.2 Types of Motion</h3>
                            <h4>A. Linear Motion</h4>
                            <p>Motion in a straight line. Examples: A car moving on a straight road, a ball falling vertically.</p>
                            
                            <h4>B. Circular Motion</h4>
                            <p>Motion along a circular path. Examples: Earth revolving around the Sun, a ceiling fan rotating.</p>
                            
                            <h4>C. Oscillatory Motion</h4>
                            <p>Back and forth motion about a fixed point. Examples: Pendulum, vibrating string.</p>

                            <h3>1.3 Newton's Laws of Motion</h3>
                            
                            <h4>First Law (Law of Inertia)</h4>
                            <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>When a bus suddenly stops, passengers jerk forward due to inertia.</p>
                            </div>

                            <h4>Second Law (F = ma)</h4>
                            <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
                            <p><strong>Formula:</strong> <code>F = ma</code></p>
                            <p>Where: F = Force (Newton), m = mass (kg), a = acceleration (m/s²)</p>
                            
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>Calculate the force needed to accelerate a 10 kg object at 5 m/s²</p>
                                <p><strong>Solution:</strong></p>
                                <p>F = ma = 10 kg × 5 m/s² = 50 N</p>
                            </div>

                            <h4>Third Law (Action-Reaction)</h4>
                            <p>For every action, there is an equal and opposite reaction.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>When you push a wall, the wall pushes back with equal force.</p>
                            </div>

                            <h3>1.4 Work and Energy</h3>
                            <h4>Work</h4>
                            <p>Work is done when a force causes displacement of an object.</p>
                            <p><strong>Formula:</strong> <code>W = F × d × cos θ</code></p>
                            <p>Where: W = Work (Joule), F = Force (N), d = displacement (m), θ = angle between force and displacement</p>

                            <h4>Energy</h4>
                            <p>Energy is the capacity to do work. It exists in various forms:</p>
                            <ul>
                                <li><strong>Kinetic Energy:</strong> Energy of motion, KE = ½mv²</li>
                                <li><strong>Potential Energy:</strong> Stored energy, PE = mgh</li>
                                <li><strong>Mechanical Energy:</strong> Sum of KE and PE</li>
                            </ul>

                            <h3>1.5 Medical Applications of Mechanics</h3>
                            <ul>
                                <li><strong>Blood Pressure:</strong> Understanding fluid mechanics in blood vessels</li>
                                <li><strong>Bone Mechanics:</strong> Forces on bones and joints</li>
                                <li><strong>Muscle Movement:</strong> Application of force and leverage</li>
                                <li><strong>Medical Devices:</strong> Syringes, wheelchairs, hospital beds</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>State Newton's three laws of motion with examples.</li>
                                <li>Calculate the work done when a force of 20 N moves an object 5 m in the direction of force.</li>
                                <li>A 2 kg object is moving at 10 m/s. Calculate its kinetic energy.</li>
                                <li>Explain how mechanics is applied in medical practice.</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Force causes acceleration: F = ma</li>
                                <li>Work = Force × Displacement</li>
                                <li>Energy is conserved in isolated systems</li>
                                <li>Understanding mechanics is crucial for medical applications</li>
                            </ul>
                        `
                    }
                ],
                chemistry: [
                    {
                        id: 'ha1c1',
                        title: 'Chapter 1: Basic Chemistry and Atomic Structure',
                        description: 'Atomic structure, periodic table, and chemical bonding',
                        topics: ['Atoms', 'Periodic Table', 'Chemical Bonds', 'Reactions'],
                        viewLink: 'note-detail.html?id=ha1c1',
                        lastUpdated: '2024-01-18',
                        readTime: 20,
                        content: `
                            <h2>1. Basic Chemistry and Atomic Structure</h2>
                            
                            <h3>1.1 Introduction to Chemistry</h3>
                            <p>Chemistry is the science that deals with the composition, structure, properties, and reactions of matter. It is essential for understanding biological processes and medical treatments.</p>

                            <h3>1.2 Atomic Structure</h3>
                            <h4>Components of an Atom</h4>
                            <ul>
                                <li><strong>Protons:</strong> Positively charged particles in the nucleus</li>
                                <li><strong>Neutrons:</strong> Neutral particles in the nucleus</li>
                                <li><strong>Electrons:</strong> Negatively charged particles orbiting the nucleus</li>
                            </ul>

                            <div class="note-example">
                                <h4>Atomic Number and Mass Number</h4>
                                <p><strong>Atomic Number (Z):</strong> Number of protons in an atom</p>
                                <p><strong>Mass Number (A):</strong> Sum of protons and neutrons</p>
                                <p><strong>Example:</strong> Carbon-12 has 6 protons, 6 neutrons, and 6 electrons</p>
                            </div>

                            <h3>1.3 Electronic Configuration</h3>
                            <p>Electrons are arranged in shells around the nucleus:</p>
                            <ul>
                                <li><strong>K shell:</strong> Maximum 2 electrons</li>
                                <li><strong>L shell:</strong> Maximum 8 electrons</li>
                                <li><strong>M shell:</strong> Maximum 18 electrons</li>
                                <li><strong>N shell:</strong> Maximum 32 electrons</li>
                            </ul>

                            <div class="note-example">
                                <h4>Example: Sodium (Na, Z=11)</h4>
                                <p>Electronic configuration: 2, 8, 1</p>
                                <p>K shell: 2 electrons, L shell: 8 electrons, M shell: 1 electron</p>
                            </div>

                            <h3>1.4 Periodic Table</h3>
                            <p>The periodic table organizes elements based on their atomic number and properties.</p>
                            
                            <h4>Groups and Periods</h4>
                            <ul>
                                <li><strong>Groups:</strong> Vertical columns (1-18)</li>
                                <li><strong>Periods:</strong> Horizontal rows (1-7)</li>
                            </ul>

                            <h4>Important Groups</h4>
                            <ul>
                                <li><strong>Group 1:</strong> Alkali metals (Li, Na, K)</li>
                                <li><strong>Group 17:</strong> Halogens (F, Cl, Br, I)</li>
                                <li><strong>Group 18:</strong> Noble gases (He, Ne, Ar)Perfect! Let me create detailed notes for HA and Pharmacy subjects! 📚✨

I'll add comprehensive content to the **ctevt-data.js** file with full note content for each subject.

---

## 📄 **UPDATED ctevt-data.js** (With Full Note Content)

Replace your `ctevt-data.js` with this updated version that includes full note content:

```javascript
// ==================== CTEVT NOTES DATABASE ====================

const ctevtDatabase = {
    // Health Assistant Program
    ha: {
        programName: 'Health Assistant (HA)',
        programIcon: 'fas fa-heartbeat',
        year1: {
            yearName: '1st Year',
            subjects: {
                physics: [
                    {
                        id: 'ha1p1',
                        title: 'Chapter 1: Mechanics and Motion',
                        description: 'Introduction to mechanics, motion, force, and Newton\'s laws',
                        topics: ['Motion', 'Force', 'Newton\'s Laws', 'Work & Energy'],
                        viewLink: 'note-detail.html?id=ha1p1',
                        lastUpdated: '2024-01-15',
                        readTime: 18,
                        content: `
                            <h2>1. Mechanics and Motion</h2>
                            
                            <h3>1.1 Introduction to Mechanics</h3>
                            <p>Mechanics is the branch of physics that deals with the motion of objects and the forces that cause motion. It is fundamental to understanding how the physical world works.</p>
                            
                            <h3>1.2 Types of Motion</h3>
                            <h4>A. Linear Motion</h4>
                            <p>Motion in a straight line. Examples: A car moving on a straight road, a ball falling vertically.</p>
                            
                            <h4>B. Circular Motion</h4>
                            <p>Motion along a circular path. Examples: Earth revolving around the Sun, a ceiling fan rotating.</p>
                            
                            <h4>C. Oscillatory Motion</h4>
                            <p>Back and forth motion about a fixed point. Examples: Pendulum, vibrating string.</p>

                            <h3>1.3 Newton's Laws of Motion</h3>
                            
                            <h4>First Law (Law of Inertia)</h4>
                            <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>When a bus suddenly stops, passengers jerk forward due to inertia.</p>
                            </div>

                            <h4>Second Law (F = ma)</h4>
                            <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
                            <p><strong>Formula:</strong> <code>F = ma</code></p>
                            <p>Where: F = Force (Newton), m = mass (kg), a = acceleration (m/s²)</p>
                            
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>Calculate the force needed to accelerate a 10 kg object at 5 m/s²</p>
                                <p><strong>Solution:</strong></p>
                                <p>F = ma = 10 kg × 5 m/s² = 50 N</p>
                            </div>

                            <h4>Third Law (Action-Reaction)</h4>
                            <p>For every action, there is an equal and opposite reaction.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>When you push a wall, the wall pushes back with equal force.</p>
                            </div>

                            <h3>1.4 Work and Energy</h3>
                            <h4>Work</h4>
                            <p>Work is done when a force causes displacement of an object.</p>
                            <p><strong>Formula:</strong> <code>W = F × d × cos θ</code></p>
                            <p>Where: W = Work (Joule), F = Force (N), d = displacement (m), θ = angle between force and displacement</p>

                            <h4>Energy</h4>
                            <p>Energy is the capacity to do work. It exists in various forms:</p>
                            <ul>
                                <li><strong>Kinetic Energy:</strong> Energy of motion, KE = ½mv²</li>
                                <li><strong>Potential Energy:</strong> Stored energy, PE = mgh</li>
                                <li><strong>Mechanical Energy:</strong> Sum of KE and PE</li>
                            </ul>

                            <h3>1.5 Medical Applications of Mechanics</h3>
                            <ul>
                                <li><strong>Blood Pressure:</strong> Understanding fluid mechanics in blood vessels</li>
                                <li><strong>Bone Mechanics:</strong> Forces on bones and joints</li>
                                <li><strong>Muscle Movement:</strong> Application of force and leverage</li>
                                <li><strong>Medical Devices:</strong> Syringes, wheelchairs, hospital beds</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>State Newton's three laws of motion with examples.</li>
                                <li>Calculate the work done when a force of 20 N moves an object 5 m in the direction of force.</li>
                                <li>A 2 kg object is moving at 10 m/s. Calculate its kinetic energy.</li>
                                <li>Explain how mechanics is applied in medical practice.</li>
                            </ol>

                            <h3>Key Points toPerfect! Let me create detailed notes for HA and Pharmacy subjects! 📚✨

I'll add comprehensive content to the **ctevt-data.js** file with full note content for each subject.

---

## 📄 **UPDATED ctevt-data.js** (With Full Note Content)

Replace your `ctevt-data.js` with this updated version that includes full note content:

```javascript
// ==================== CTEVT NOTES DATABASE ====================

const ctevtDatabase = {
    // Health Assistant Program
    ha: {
        programName: 'Health Assistant (HA)',
        programIcon: 'fas fa-heartbeat',
        year1: {
            yearName: '1st Year',
            subjects: {
                physics: [
                    {
                        id: 'ha1p1',
                        title: 'Chapter 1: Mechanics and Motion',
                        description: 'Introduction to mechanics, motion, force, and Newton\'s laws',
                        topics: ['Motion', 'Force', 'Newton\'s Laws', 'Work & Energy'],
                        viewLink: 'note-detail.html?id=ha1p1',
                        lastUpdated: '2024-01-15',
                        readTime: 18,
                        content: `
                            <h2>1. Mechanics and Motion</h2>
                            
                            <h3>1.1 Introduction to Mechanics</h3>
                            <p>Mechanics is the branch of physics that deals with the motion of objects and the forces that cause motion. It is fundamental to understanding how the physical world works.</p>
                            
                            <h3>1.2 Types of Motion</h3>
                            <h4>A. Linear Motion</h4>
                            <p>Motion in a straight line. Examples: A car moving on a straight road, a ball falling vertically.</p>
                            
                            <h4>B. Circular Motion</h4>
                            <p>Motion along a circular path. Examples: Earth revolving around the Sun, a ceiling fan rotating.</p>
                            
                            <h4>C. Oscillatory Motion</h4>
                            <p>Back and forth motion about a fixed point. Examples: Pendulum, vibrating string.</p>

                            <h3>1.3 Newton's Laws of Motion</h3>
                            
                            <h4>First Law (Law of Inertia)</h4>
                            <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>When a bus suddenly stops, passengers jerk forward due to inertia.</p>
                            </div>

                            <h4>Second Law (F = ma)</h4>
                            <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
                            <p><strong>Formula:</strong> <code>F = ma</code></p>
                            <p>Where: F = Force (Newton), m = mass (kg), a = acceleration (m/s²)</p>
                            
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>Calculate the force needed to accelerate a 10 kg object at 5 m/s²</p>
                                <p><strong>Solution:</strong></p>
                                <p>F = ma = 10 kg × 5 m/s² = 50 N</p>
                            </div>

                            <h4>Third Law (Action-Reaction)</h4>
                            <p>For every action, there is an equal and opposite reaction.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>When you push a wall, the wall pushes back with equal force.</p>
                            </div>

                            <h3>1.4 Work and Energy</h3>
                            <h4>Work</h4>
                            <p>Work is done when a force causes displacement of an object.</p>
                            <p><strong>Formula:</strong> <code>W = F × d × cos θ</code></p>
                            <p>Where: W = Work (Joule), F = Force (N), d = displacement (m), θ = angle between force and displacement</p>

                            <h4>Energy</h4>
                            <p>Energy is the capacity to do work. It exists in various forms:</p>
                            <ul>
                                <li><strong>Kinetic Energy:</strong> Energy of motion, KE = ½mv²</li>
                                <li><strong>Potential Energy:</strong> Stored energy, PE = mgh</li>
                                <li><strong>Mechanical Energy:</strong> Sum of KE and PE</li>
                            </ul>

                            <h3>1.5 Applications in Healthcare</h3>
                            <ul>
                                <li><strong>Body Mechanics:</strong> Understanding forces in human movement</li>
                                <li><strong>Medical Equipment:</strong> Principles of levers in surgical instruments</li>
                                <li><strong>Patient Handling:</strong> Using proper body mechanics to prevent injury</li>
                                <li><strong>Prosthetics:</strong> Applying mechanical principles in artificial limbs</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>State Newton's three laws of motion with examples.</li>
                                <li>Calculate the work done when a force of 20 N moves an object 5 m in the direction of force.</li>
                                <li>A 2 kg object is moving at 10 m/s. Calculate its kinetic energy.</li>
                                <li>Explain how understanding mechanics helps in patient care.</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Force causes acceleration: F = ma</li>
                                <li>Work = Force × Displacement</li>
                                <li>Energy is conserved in isolated systems</li>
                                <li>Newton's laws apply to all motion</li>
                                <li>Understanding mechanics is crucial for healthcare professionals</li>
                            </ul>
                        `
                    }
                ],
                chemistry: [
                    {
                        id: 'ha1c1',
                        title: 'Chapter 1: Basic Chemistry and Atomic Structure',
                        description: 'Atomic structure, periodic table, and chemical bonding',
                        topics: ['Atoms', 'Periodic Table', 'Chemical Bonds', 'Reactions'],
                        viewLink: 'note-detail.html?id=ha1c1',
                        lastUpdated: '2024-01-18',
                        readTime: 20,
                        content: `
                            <h2>1. Basic Chemistry and Atomic Structure</h2>
                            
                            <h3>1.1 Introduction to Chemistry</h3>
                            <p>Chemistry is the science that deals with the composition, structure, properties, and reactions of matter. It is essential for understanding biological processes and medical treatments.</p>

                            <h3>1.2 Atomic Structure</h3>
                            <h4>Components of an Atom</h4>
                            <ul>
                                <li><strong>Protons:</strong> Positively charged particles in the nucleus</li>
                                <li><strong>Neutrons:</strong> Neutral particles in the nucleus</li>
                                <li><strong>Electrons:</strong> Negatively charged particles orbiting the nucleus</li>
                            </ul>

                            <div class="note-example">
                                <h4>Atomic Number and Mass Number</h4>
                                <p><strong>Atomic Number (Z):</strong> Number of protons in an atom</p>
                                <p><strong>Mass Number (A):</strong> Sum of protons and neutrons</p>
                                <p><strong>Example:</strong> Carbon-12 has 6 protons, 6 neutrons, and 6 electrons</p>
                            </div>

                            <h3>1.3 The Periodic Table</h3>
                            <p>The periodic table organizes elements based on their atomic number and chemical properties.</p>
                            
                            <h4>Groups and Periods</h4>
                            <ul>
                                <li><strong>Groups:</strong> Vertical columns (1-18), elements with similar properties</li>
                                <li><strong>Periods:</strong> Horizontal rows (1-7), indicate electron shells</li>
                            </ul>

                            <h4>Important Element Groups</h4>
                            <ul>
                                <li><strong>Group 1:</strong> Alkali metals (Na, K) - highly reactive</li>
                                <li><strong>Group 17:</strong> Halogens (Cl, F) - very reactive non-metals</li>
                                <li><strong>Group 18:</strong> Noble gases (He, Ne) - inert gases</li>
                            </ul>

                            <h3>1.4 Chemical Bonding</h3>
                            
                            <h4>A. Ionic Bonding</h4>
                            <p>Transfer of electrons from one atom to another, forming ions.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>NaCl (Sodium Chloride): Na⁺ + Cl⁻ → NaCl</p>
                                <p>Sodium loses one electron, chlorine gains one electron</p>
                            </div>

                            <h4>B. Covalent Bonding</h4>
                            <p>Sharing of electrons between atoms.</p>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>H₂O (Water): Two hydrogen atoms share electrons with one oxygen atom</p>
                            </div>

                            <h4>C. Hydrogen Bonding</h4>
                            <p>Weak attraction between a hydrogen atom and an electronegative atom (O, N, F).</p>
                            <p><strong>Importance:</strong> Critical for DNA structure, protein folding, and water properties</p>

                            <h3>1.5 Chemical Reactions</h3>
                            
                            <h4>Types of Reactions</h4>
                            <ul>
                                <li><strong>Synthesis:</strong> A + B → AB</li>
                                <li><strong>Decomposition:</strong> AB → A + B</li>
                                <li><strong>Single Replacement:</strong> A + BC → AC + B</li>
                                <li><strong>Double Replacement:</strong> AB + CD → AD + CB</li>
                            </ul>

                            <h3>1.6 pH and Acids/Bases</h3>
                            <p>pH measures the acidity or basicity of a solution (scale 0-14).</p>
                            <ul>
                                <li><strong>pH < 7:</strong> Acidic (stomach acid pH ~2)</li>
                                <li><strong>pH = 7:</strong> Neutral (pure water)</li>
                                <li><strong>pH > 7:</strong> Basic/Alkaline (blood pH ~7.4)</li>
                            </ul>

                            <h3>1.7 Medical Applications</h3>
                            <ul>
                                <li><strong>Drug Chemistry:</strong> Understanding molecular structure of medications</li>
                                <li><strong>Body Chemistry:</strong> Electrolyte balance (Na⁺, K⁺, Cl⁻)</li>
                                <li><strong>Blood pH:</strong> Maintaining acid-base balance</li>
                                <li><strong>Disinfection:</strong> Chemical reactions in sterilization</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>Draw the atomic structure of oxygen (atomic number 8).</li>
                                <li>Explain the difference between ionic and covalent bonding with examples.</li>
                                <li>What is the pH of blood? Why is it important to maintain this pH?</li>
                                <li>Write the chemical formula for table salt and explain the bonding.</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Atoms consist of protons, neutrons, and electrons</li>
                                <li>The periodic table organizes elements by properties</li>
                                <li>Chemical bonds form through electron transfer or sharing</li>
                                <li>pH is crucial for biological processes</li>
                                <li>Chemistry is fundamental to understanding medicine</li>
                            </ul>
                        `
                    }
                ],
                anatomy: [
                    {
                        id: 'ha1a1',
                        title: 'Chapter 1: Introduction to Human Anatomy',
                        description: 'Introduction to human body systems and anatomical terminology',
                        topics: ['Body Systems', 'Terminology', 'Skeletal System', 'Muscular System'],
                        viewLink: 'note-detail.html?id=ha1a1',
                        lastUpdated: '2024-01-25',
                        readTime: 25,
                        content: `
                            <h2>1. Introduction to Human Anatomy</h2>
                            
                            <h3>1.1 What is Anatomy?</h3>
                            <p>Anatomy is the science of the structure of the human body. It is essential for health professionals to understand body structure to provide effective care.</p>

                            <h3>1.2 Anatomical Terminology</h3>
                            
                            <h4>Anatomical Position</h4>
                            <p>Standard reference position: standing upright, facing forward, arms at sides, palms facing forward.</p>

                            <h4>Directional Terms</h4>
                            <ul>
                                <li><strong>Superior:</strong> Above (head is superior to chest)</li>
                                <li><strong>Inferior:</strong> Below (feet are inferior to knees)</li>
                                <li><strong>Anterior (Ventral):</strong> Front (chest is anterior)</li>
                                <li><strong>Posterior (Dorsal):</strong> Back (spine is posterior)</li>
                                <li><strong>Medial:</strong> Toward midline (nose is medial to eyes)</li>
                                <li><strong>Lateral:</strong> Away from midline (ears are lateral to nose)</li>
                                <li><strong>Proximal:</strong> Closer to attachment point (shoulder is proximal to elbow)</li>
                                <li><strong>Distal:</strong> Farther from attachment point (hand is distal to elbow)</li>
                            </ul>

                            <h4>Body Planes</h4>
                            <ul>
                                <li><strong>Sagittal Plane:</strong> Divides body into left and right</li>
                                <li><strong>Frontal (Coronal) Plane:</strong> Divides body into front and back</li>
                                <li><strong>Transverse (Horizontal) Plane:</strong> Divides body into upper and lower</li>
                            </ul>

                            <h3>1.3 Body Cavities</h3>
                            
                            <h4>Dorsal Cavity</h4>
                            <ul>
                                <li><strong>Cranial Cavity:</strong> Contains brain</li>
                                <li><strong>Spinal Cavity:</strong> Contains spinal cord</li>
                            </ul>

                            <h4>Ventral Cavity</h4>
                            <ul>
                                <li><strong>Thoracic Cavity:</strong> Contains heart and lungs</li>
                                <li><strong>Abdominal Cavity:</strong> Contains digestive organs</li>
                                <li><strong>Pelvic Cavity:</strong> Contains reproductive organs and bladder</li>
                            </ul>

                            <h3>1.4 Major Body Systems</h3>
                            
                            <h4>1. Skeletal System</h4>
                            <p><strong>Functions:</strong></p>
                            <ul>
                                <li>Support and protection</li>
                                <li>Movement (with muscles)</li>
                                <li>Blood cell production</li>
                                <li>Mineral storage (calcium, phosphorus)</li>
                            </ul>
                            <p><strong>Components:</strong> 206 bones in adult human body</p>

                            <h4>2. Muscular System</h4>
                            <p><strong>Types of Muscles:</strong></p>
                            <ul>
                                <li><strong>Skeletal Muscle:</strong> Voluntary, attached to bones</li>
                                <li><strong>Cardiac Muscle:</strong> Involuntary, found in heart</li>
                                <li><strong>Smooth Muscle:</strong> Involuntary, found in organs</li>
                            </ul>

                            <h4>3. Cardiovascular System</h4>
                            <p><strong>Components:</strong></p>
                            <ul>
                                <li>Heart: Pumps blood</li>
                                <li>Blood vessels: Arteries, veins, capillaries</li>
                                <li>Blood: Transports oxygen, nutrients, waste</li>
                            </ul>

                            <h4>4. Respiratory System</h4>
                            <p><strong>Components:</strong></p>
                            <ul>
                                <li>Nose and nasal cavity</li>
                                <li>Pharynx and larynx</li>
                                <li>Trachea</li>
                                <li>Bronchi and lungs</li>
                            </ul>
                            <p><strong>Function:</strong> Gas exchange (O₂ in, CO₂ out)</p>

                            <h4>5. Digestive System</h4>
                            <p><strong>Components:</strong></p>
                            <ul>
                                <li>Mouth, esophagus, stomach</li>
                                <li>Small intestine, large intestine</li>
                                <li>Liver, pancreas, gallbladder</li>
                            </ul>
                            <p><strong>Function:</strong> Break down food, absorb nutrients</p>

                            <h4>6. Nervous System</h4>
                            <p><strong>Components:</strong></p>
                            <ul>
                                <li><strong>Central Nervous System (CNS):</strong> Brain and spinal cord</li>
                                <li><strong>Peripheral Nervous System (PNS):</strong> Nerves throughout body</li>
                            </ul>
                            <p><strong>Function:</strong> Control and coordination</p>

                            <h4>7. Endocrine System</h4>
                            <p><strong>Components:</strong> Glands that produce hormones</p>
                            <ul>
                                <li>Pituitary, thyroid, adrenal glands</li>
                                <li>Pancreas, ovaries, testes</li>
                            </ul>

                            <h4>8. Urinary System</h4>
                            <p><strong>Components:</strong></p>
                            <ul>
                                <li>Kidneys: Filter blood</li>
                                <li>Ureters, bladder, urethra</li>
                            </ul>
                            <p><strong>Function:</strong> Remove waste, regulate fluid balance</p>

                            <h4>9. Reproductive System</h4>
                            <p><strong>Male:</strong> Testes, penis, prostate</p>
                            <p><strong>Female:</strong> Ovaries, uterus, vagina</p>
                            <p><strong>Function:</strong> Reproduction</p>

                            <h4>10. Integumentary System</h4>
                            <p><strong>Components:</strong> Skin, hair, nails</p>
                            <p><strong>Functions:</strong></p>
                            <ul>
                                <li>Protection from pathogens</li>
                                <li>Temperature regulation</li>
                                <li>Sensation</li>
                                <li>Vitamin D synthesis</li>
                            </ul>

                            <h3>1.5 Skeletal System in Detail</h3>
                            
                            <h4>Bone Classification</h4>
                            <ul>
                                <li><strong>Long Bones:</strong> Femur, humerus (support weight, facilitate movement)</li>
                                <li><strong>Short Bones:</strong> Carpals, tarsals (provide stability)</li>
                                <li><strong>Flat Bones:</strong> Skull, ribs, sternum (protect organs)</li>
                                <li><strong>Irregular Bones:</strong> Vertebrae, facial bones</li>
                            </ul>

                            <h4>Major Bones</h4>
                            <ul>
                                <li><strong>Skull:</strong> Protects brain (cranium and facial bones)</li>
                                <li><strong>Vertebral Column:</strong> 33 vertebrae, protects spinal cord</li>
                                <li><strong>Ribs:</strong> 12 pairs, protect thoracic organs</li>
                                <li><strong>Sternum:</strong> Breastbone</li>
                                <li><strong>Upper Limbs:</strong> Humerus, radius, ulna, carpals, metacarpals, phalanges</li>
                                <li><strong>Lower Limbs:</strong> Femur, tibia, fibula, tarsals, metatarsals, phalanges</li>
                                <li><strong>Pelvis:</strong> Hip bones, supports body weight</li>
                            </ul>

                            <h3>1.6 Clinical Applications</h3>
                            <ul>
                                <li><strong>Patient Assessment:</strong> Using anatomical landmarks</li>
                                <li><strong>Injection Sites:</strong> Identifying safe injection locations</li>
                                <li><strong>Physical Examination:</strong> Understanding organ locations</li>
                                <li><strong>Medical Imaging:</strong> Interpreting X-rays, CT scans</li>
                                <li><strong>Surgical Procedures:</strong> Anatomical knowledge for safe surgery</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>Define anatomical position and explain its importance.</li>
                                <li>List and describe the three body planes.</li>
                                <li>Name the major body systems and their primary functions.</li>
                                <li>Describe the components of the skeletal system.</li>
                                <li>Explain how anatomical knowledge is used in patient care.</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Anatomical terminology provides a universal language for healthcare</li>
                                <li>The human body has 11 major organ systems</li>
                                <li>The skeletal system has 206 bones in adults</li>
                                <li>Understanding anatomy is crucial for patient assessment</li>
                                <li>Body systems work together to maintain homeostasis</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        year2: {
            yearName: '2nd Year',
            subjects: {
                medicine1: [
                    {
                        id: 'ha2m1',
                        title: 'Introduction to Medicine and Patient Assessment',
                        description: 'Basic medical concepts, patient assessment, and common diseases',
                        topics: ['Patient Assessment', 'Common Diseases', 'Diagnosis', 'Treatment'],
                        viewLink: 'note-detail.html?id=ha2m1',
                        lastUpdated: '2024-02-01',
                        readTime: 30,
                        content: `
                            <h2>Introduction to Medicine and Patient Assessment</h2>
                            
                            <h3>1.1 Introduction to Clinical Medicine</h3>
                            <p>Clinical medicine involves the diagnosis, treatment, and prevention of diseases. As a health assistant, you play a crucial role in patient care and assessment.</p>

                            <h3>1.2 Patient Assessment</h3>
                            
                            <h4>A. History Taking</h4>
                            <p>Gathering comprehensive patient information is the foundation of diagnosis.</p>
                            
                            <h5>Components of Medical History:</h5>
                            <ul>
                                <li><strong>Chief Complaint (CC):</strong> Main reason for visit</li>
                                <li><strong>History of Present Illness (HPI):</strong> Detailed description of current problem</li>
                                <li><strong>Past Medical History (PMH):</strong> Previous illnesses, surgeries, hospitalizations</li>
                                <li><strong>Medications:</strong> Current and past medications</li>
                                <li><strong>Allergies:</strong> Drug and food allergies</li>
                                <li><strong>Family History:</strong> Hereditary conditions</li>
                                <li><strong>Social History:</strong> Lifestyle, occupation, habits</li>
                            </ul>

                            <div class="note-example">
                                <h4>Example History Taking:</h4>
                                <p><strong>CC:</strong> "I have chest pain"</p>
                                <p><strong>HPI:</strong> 55-year-old male with sudden onset chest pain, radiating to left arm, started 2 hours ago, associated with sweating and shortness of breath</p>
                            </div>

                            <h4>B. Physical Examination</h4>
                            <p>Systematic examination of the patient's body.</p>
                            
                            <h5>Vital Signs:</h5>
                            <ul>
                                <li><strong>Temperature:</strong> Normal 36.5-37.5°C (97.7-99.5°F)</li>
                                <li><strong>Pulse Rate:</strong> Normal 60-100 beats/minute</li>
                                <li><strong>Respiratory Rate:</strong> Normal 12-20 breaths/minute</li>
                                <li><strong>Blood Pressure:</strong> Normal <120/80 mmHg</li>
                                <li><strong>Oxygen Saturation:</strong> Normal >95%</li>
                            </ul>

                            <h5>General Examination:</h5>
                            <ul>
                                <li>General appearance and consciousness level</li>
                                <li>Skin color and condition</li>
                                <li>Nutritional status</li>
                                <li>Hydration status</li>
                                <li>Lymph nodes examination</li>
                            </ul>

                            <h5>Systemic Examination:</h5>
                            <ul>
                                <li><strong>Cardiovascular:</strong> Heart sounds, peripheral pulses</li>
                                <li><strong>Respiratory:</strong> Breath sounds, chest expansion</li>
                                <li><strong>Abdominal:</strong> Inspection, palpation, percussion, auscultation</li>
                                <li><strong>Neurological:</strong> Consciousness, reflexes, motor and sensory function</li>
                            </ul>

                            <h3>1.3 Common Diseases</h3>
                            
                            <h4>A. Respiratory Diseases</h4>
                            
                            <h5>1. Common Cold</h5>
                            <p><strong>Cause:</strong> Viral infection (rhinovirus)</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>Runny nose, sneezing</li>
                                <li>Sore throat, cough</li>
                                <li>Mild fever, headache</li>
                            </ul>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Rest and hydration</li>
                                <li>Symptomatic relief (paracetamol, decongestants)</li>
                                <li>Usually resolves in 7-10 days</li>
                            </ul>

                            <h5>2. Pneumonia</h5>
                            <p><strong>Cause:</strong> Bacterial, viral, or fungal infection of lungs</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>High fever, chills</li>
                                <li>Productive cough with sputum</li>
                                <li>Chest pain, difficulty breathing</li>
                                <li>Fatigue, loss of appetite</li>
                            </ul>
                            <p><strong>Diagnosis:</strong> Chest X-ray, sputum culture</p>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Antibiotics (for bacterial pneumonia)</li>
                                <li>Oxygen therapy if needed</li>
                                <li>Rest and hydration</li>
                            </ul>

                            <h5>3. Asthma</h5>
                            <p><strong>Cause:</strong> Chronic inflammatory airway disease</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>Wheezing, shortness of breath</li>
                                <li>Chest tightness, cough</li>
                                <li>Symptoms worse at night or with exercise</li>
                            </ul>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Bronchodilators (salbutamol inhaler)</li>
                                <li>Corticosteroid inhalers</li>
                                <li>Avoid triggers (dust, smoke, allergens)</li>
                            </ul>

                            <h4>B. Cardiovascular Diseases</h4>
                            
                            <h5>1. Hypertension (High Blood Pressure)</h5>
                            <p><strong>Definition:</strong> BP ≥140/90 mmHg</p>
                            <p><strong>Risk Factors:</strong></p>
                            <ul>
                                <li>Age, family history</li>
                                <li>Obesity, sedentary lifestyle</li>
                                <li>High salt intake, smoking</li>
                                <li>Stress, diabetes</li>
                            </ul>
                            <p><strong>Complications:</strong></p>
                            <ul>
                                <li>Heart attack, stroke</li>
                                <li>Kidney disease</li>
                                <li>Vision problems</li>
                            </ul>
                            <p><strong>Management:</strong></p>
                            <ul>
                                <li>Lifestyle modifications (diet, exercise, weight loss)</li>
                                <li>Antihypertensive medications</li>
                                <li>Regular monitoring</li>
                            </ul>

                            <h5>2. Coronary Artery Disease (CAD)</h5>
                            <p><strong>Cause:</strong> Narrowing of coronary arteries due to atherosclerosis</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>Chest pain (angina)</li>
                                <li>Shortness of breath</li>
                                <li>Fatigue</li>
                            </ul>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Medications (aspirin, statins, beta-blockers)</li>
                                <li>Lifestyle changes</li>
                                <li>Angioplasty or bypass surgery if severe</li>
                            </ul>

                            <h4>C. Gastrointestinal Diseases</h4>
                            
                            <h5>1. Gastritis</h5>
                            <p><strong>Cause:</strong> Inflammation of stomach lining</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>Upper abdominal pain</li>
                                <li>Nausea, vomiting</li>
                                <li>Loss of appetite</li>
                                <li>Bloating</li>
                            </ul>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Antacids, proton pump inhibitors</li>
                                <li>Avoid spicy foods, alcohol</li>
                                <li>Treat H. pylori if present</li>
                            </ul>

                            <h5>2. Diarrhea</h5>
                            <p><strong>Causes:</strong> Infection, food poisoning, medications</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>Loose, watery stools</li>
                                <li>Abdominal cramps</li>
                                <li>Dehydration</li>
                            </ul>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Oral rehydration solution (ORS)</li>
                                <li>Zinc supplementation (for children)</li>
                                <li>Antibiotics if bacterial</li>
                                <li>Maintain hygiene</li>
                            </ul>

                            <h4>D. Infectious Diseases</h4>
                            
                            <h5>1. Tuberculosis (TB)</h5>
                            <p><strong>Cause:</strong> Mycobacterium tuberculosis</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>Chronic cough (>2 weeks)</li>
                                <li>Coughing up blood</li>
                                <li>Night sweats, fever</li>
                                <li>Weight loss, fatigue</li>
                            </ul>
                            <p><strong>Diagnosis:</strong> Sputum test, chest X-ray</p>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>6-9 months of anti-TB drugs</li>
                                <li>DOTS (Directly Observed Treatment Short-course)</li>
                                <li>Isolation during infectious period</li>
                            </ul>

                            <h5>2. Typhoid Fever</h5>
                            <p><strong>Cause:</strong> Salmonella typhi bacteria</p>
                            <p><strong>Symptoms:</strong></p>
                            <ul>
                                <li>Sustained high fever</li>
                                <li>Headache, abdominal pain</li>
                                <li>Rose spots on trunk</li>
                                <li>Constipation or diarrhea</li>
                            </ul>
                            <p><strong>Treatment:</strong></p>
                            <ul>
                                <li>Antibiotics (ciprofloxacin, azithromycin)</li>
                                <li>Supportive care, hydration</li>
                                <li>Prevention: vaccination, safe water</li>
                            </ul>

                            <h3>1.4 Diagnostic Approach</h3>
                            
                            <h4>Steps in Diagnosis:</h4>
                            <ol>
                                <li><strong>History Taking:</strong> Gather patient information</li>
                                <li><strong>Physical Examination:</strong> Examine the patient</li>
                                <li><strong>Differential Diagnosis:</strong> List possible conditions</li>
                                <li><strong>Investigations:</strong> Order appropriate tests</li>
                                <li><strong>Final Diagnosis:</strong> Confirm the condition</li>
                                <li><strong>Treatment Plan:</strong> Develop management strategy</li>
                            </ol>

                            <h4>Common Investigations:</h4>
                            <ul>
                                <li><strong>Blood Tests:</strong> CBC, blood sugar, liver function, kidney function</li>
                                <li><strong>Urine Tests:</strong> Urinalysis, urine culture</li>
                                <li><strong>Imaging:</strong> X-ray, ultrasound, CT scan</li>
                                <li><strong>ECG:</strong> For heart conditions</li>
                                <li><strong>Sputum Test:</strong> For respiratory infections</li>
                            </ul>

                            <h3>1.5 Patient Communication</h3>
                            <ul>
                                <li><strong>Active Listening:</strong> Pay attention to patient concerns</li>
                                <li><strong>Empathy:</strong> Show understanding and compassion</li>
                                <li><strong>Clear Explanation:</strong> Use simple language</li>
                                <li><strong>Confidentiality:</strong> Maintain patient privacy</li>
                                <li><strong>Cultural Sensitivity:</strong> Respect cultural beliefs</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>List the components of a complete medical history.</li>
                                <li>What are the normal ranges for vital signs?</li>
                                <li>Describe the symptoms and treatment of pneumonia.</li>
                                <li>Explain the management of hypertension.</li>
                                <li>What is the DOTS strategy for tuberculosis treatment?</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Thorough history and examination are crucial for diagnosis</li>
                                <li>Vital signs provide important clinical information</li>
                                <li>Common diseases require prompt recognition and treatment</li>
                                <li>Patient communication is essential for effective care</li>
                                <li>Always maintain confidentiality and professionalism</li>
                            </ul>
                        `
                    }
                ],
                pharmacology: [
                    {
                        id: 'ha2ph1',
                        title: 'Introduction to Pharmacology and Drug Administration',
                        description: 'Drug classification, administration routes, and pharmaceutical care',
                        topics: ['Drug Classes', 'Administration', 'Side Effects', 'Pharmacy Practice'],
                        viewLink: 'note-detail.html?id=ha2ph1',
                        lastUpdated: '2024-02-15',
                        readTime: 27,
                        content: `
                            <h2>Introduction to Pharmacology and Drug Administration</h2>
                            
                            <h3>1.1 What is Pharmacology?</h3>
                            <p>Pharmacology is the science of drugs and their effects on living systems. It includes the study of drug sources, properties, interactions, and therapeutic uses.</p>

                            <h4>Key Terms:</h4>
                            <ul>
                                <li><strong>Pharmacokinetics:</strong> What the body does to the drug (ADME)</li>
                                <li><strong>Pharmacodynamics:</strong> What the drug does to the body</li>
                                <li><strong>Therapeutic Effect:</strong> Desired beneficial effect</li>
                                <li><strong>Side Effect:</strong> Unintended effect</li>
                                <li><strong>Adverse Effect:</strong> Harmful or undesired effect</li>
                            </ul>

                            <h3>1.2 Pharmacokinetics (ADME)</h3>
                            
                            <h4>A. Absorption</h4>
                            <p>Movement of drug from site of administration into bloodstream.</p>
                            <p><strong>Factors Affecting Absorption:</strong></p>
                            <ul>
                                <li>Route of administration</li>
                                <li>Drug formulation</li>
                                <li>Blood flow to absorption site</li>
                                <li>Food in stomach (for oral drugs)</li>
                            </ul>

                            <h4>B. Distribution</h4>
                            <p>Movement of drug from bloodstream to tissues and organs.</p>
                            <p><strong>Factors:</strong></p>
                            <ul>
                                <li>Blood flow</li>
                                <li>Protein binding</li>
                                <li>Tissue permeability</li>
                            </ul>

                            <h4>C. Metabolism</h4>
                            <p>Chemical alteration of drug, primarily in liver.</p>
                            <p><strong>Purpose:</strong> Convert drugs to more water-soluble forms for excretion</p>

                            <h4>D. Excretion</h4>
                            <p>Elimination of drug from body.</p>
                            <p><strong>Main Routes:</strong></p>
                            <ul>
                                <li>Kidneys (urine) - most common</li>
                                <li>Liver (bile/feces)</li>
                                <li>Lungs (exhaled air)</li>
                                <li>Sweat, saliva, breast milk</li>
                            </ul>

                            <h3>1.3 Routes of Drug Administration</h3>
                            
                            <h4>A. Oral Route (PO - Per Os)</h4>
                            <p><strong>Advantages:</strong></p>
                            <ul>
                                <li>Convenient and safe</li>
                                <li>Self-administration possible</li>
                                <li>Cost-effective</li>
                            </ul>
                            <p><strong>Disadvantages:</strong></p>
                            <ul>
                                <li>Slow onset of action</li>
                                <li>First-pass metabolism in liver</li>
                                <li>Cannot use if patient is vomiting or unconscious</li>
                            </ul>
                            <p><strong>Forms:</strong> Tablets, capsules, syrups, suspensions</p>

                            <h4>B. Sublingual Route</h4>
                            <p>Drug placed under tongue, absorbed directly into bloodstream.</p>
                            <p><strong>Example:</strong> Nitroglycerin for angina</p>
                            <p><strong>Advantage:</strong> Rapid onset, avoids first-pass metabolism</p>

                            <h4>C. Intravenous (IV) Route</h4>
                            <p>Direct injection into vein.</p>
                            <p><strong>Advantages:</strong></p>
                            <ul>
                                <li>Immediate effect</li>
                                <li>100% bioavailability</li>
                                <li>Precise dosing</li>
                            </ul>
                            <p><strong>Disadvantages:</strong></p>
                            <ul>
                                <li>Risk of infection</li>
                                <li>Requires trained personnel</li>
                                <li>Cannot be reversed once given</li>
                            </ul>

                            <h4>D. Intramuscular (IM) Route</h4>
                            <p>Injection into muscle tissue.</p>
                            <p><strong>Common Sites:</strong></p>
                            <ul>
                                <li>Deltoid (upper arm)</li>
                                <li>Vastus lateralis (thigh)</li>
                                <li>Ventrogluteal (hip)</li>
                                <li>Dorsogluteal (buttock)</li>
                            </ul>
                            <p><strong>Advantage:</strong> Faster than oral, can give larger volumes than SC</p>

                            <h4>E. Subcutaneous (SC) Route</h4>
                            <p>Injection under the skin.</p>
                            <p><strong>Examples:</strong> Insulin, heparin</p>
                            <p><strong>Common Sites:</strong> Abdomen, thigh, upper arm</p>

                            <h4>F. Topical Route</h4>
                            <p>Application to skin or mucous membranes.</p>
                            <p><strong>Forms:</strong> Creams, ointments, patches, eye drops, ear drops</p>
                            <p><strong>Advantage:</strong> Local effect, minimal systemic absorption</p>

                            <h4>G. Inhalation Route</h4>
                            <p>Drug inhaled into lungs.</p>
                            <p><strong>Examples:</strong> Asthma inhalers, anesthetics</p>
                            <p><strong>Advantage:</strong> Rapid onset for respiratory conditions</p>

                            <h4>H. Rectal Route</h4>
                            <p>Drug inserted into rectum.</p>
                            <p><strong>Use:</strong> When oral route not possible (vomiting, unconscious)</p>
                            <p><strong>Forms:</strong> Suppositories, enemas</p>

                            <h3>1.4 Major Drug Classes</h3>
                            
                            <h4>A. Analgesics (Pain Relievers)</h4>
                            
                            <h5>1. Non-Opioid Analgesics</h5>
                            <p><strong>Paracetamol (Acetaminophen):</strong></p>
                            <ul>
                                <li><strong>Use:</strong> Pain, fever</li>
                                <li><strong>Dose:</strong> 500-1000 mg every 4-6 hours (max 4g/day)</li>
                                <li><strong>Side Effects:</strong> Liver damage in overdose</li>
                            </ul>

                            <p><strong>NSAIDs (Ibuprofen, Diclofenac):</strong></p>
                            <ul>
                                <li><strong>Use:</strong> Pain, inflammation, fever</li>
                                <li><strong>Side Effects:</strong> Gastric irritation, kidney problems</li>
                                <li><strong>Precaution:</strong> Take with food</li>
                            </ul>

                            <h5>2. Opioid Analgesics</h5>
                            <p><strong>Examples:</strong> Morphine, codeine, tramadol</p>
                            <ul>
                                <li><strong>Use:</strong> Severe pain</li>
                                <li><strong>Side Effects:</strong> Drowsiness, constipation, respiratory depression</li>
                                <li><strong>Risk:</strong> Addiction, tolerance</li>
                            </ul>

                            <h4>B. Antibiotics</h4>
                            <p>Drugs that kill or inhibit bacterial growth.</p>
                            
                            <h5>Major Classes:</h5>
                            <ul>
                                <li><strong>Penicillins:</strong> Amoxicillin, ampicillin</li>
                                <li><strong>Cephalosporins:</strong> Cefixime, ceftriaxone</li>
                                <li><strong>Macrolides:</strong> Azithromycin, erythromycin</li>
                                <li><strong>Fluoroquinolones:</strong> Ciprofloxacin, levofloxacin</li>
                                <li><strong>Tetracyclines:</strong> Doxycycline</li>
                            </ul>

                            <p><strong>Important Points:</strong></p>
                            <ul>
                                <li>Complete full course even if feeling better</li>
                                <li>Take at regular intervals</li>
                                <li>Check for allergies before administration</li>
                                <li>Monitor for side effects</li>
                            </ul>

                            <h4>C. Antihypertensives</h4>
                            <p>Drugs that lower blood pressure.</p>
                            
                            <h5>Classes:</h5>
                            <ul>
                                <li><strong>ACE Inhibitors:</strong> Enalapril, lisinopril (end in -pril)</li>
                                <li><strong>ARBs:</strong> Losartan, valsartan (end in -sartan)</li>
                                <li><strong>Beta-blockers:</strong> Atenolol, metoprolol (end in -olol)</li>
                                <li><strong>Calcium Channel Blockers:</strong> Amlodipine, nifedipine</li>
                                <li><strong>Diuretics:</strong> Furosemide, hydrochlorothiazide</li>
                            </ul>

                            <h4>D. Antidiabetic Drugs</h4>
                            
                            <h5>Insulin:</h5>
                            <ul>
                                <li><strong>Types:</strong> Rapid-acting, short-acting, intermediate, long-acting</li>
                                <li><strong>Route:</strong> Subcutaneous injection</li>
                                <li><strong>Storage:</strong> Refrigerate, protect from light</li>
                            </ul>

                            <h5>Oral Hypoglycemics:</h5>
                            <ul>
                                <li><strong>Metformin:</strong> First-line for Type 2 diabetes</li>
                                <li><strong>Glibenclamide:</strong> Stimulates insulin release</li>
                            </ul>

                            <h4>E. Bronchodilators</h4>
                            <p><strong>Salbutamol (Albuterol):</strong></p>
                            <ul>
                                <li><strong>Use:</strong> Asthma, COPD</li>
                                <li><strong>Route:</strong> Inhalation</li>
                                <li><strong>Action:</strong> Relaxes airway muscles</li>
                                <li><strong>Side Effects:</strong> Tremor, palpitations</li>
                            </ul>

                            <h3>1.5 Drug Administration Principles</h3>
                            
                            <h4>The 5 Rights of Drug Administration:</h4>
                            <ol>
                                <li><strong>Right Patient:</strong> Verify patient identity</li>
                                <li><strong>Right Drug:</strong> Check drug name carefully</li>
                                <li><strong>Right Dose:</strong> Calculate and verify dose</li>
                                <li><strong>Right Route:</strong> Ensure correct administration route</li>
                                <li><strong>Right Time:</strong> Give at prescribed time</li>
                            </ol>

                            <h4>Additional Rights:</h4>
                            <ul>
                                <li><strong>Right Documentation:</strong> Record administration</li>
                                <li><strong>Right to Refuse:</strong> Patient can refuse medication</li>
                                <li><strong>Right Assessment:</strong> Check patient condition before giving</li>
                            </ul>

                            <h3>1.6 Drug Interactions</h3>
                            
                            <h4>Types:</h4>
                            <ul>
                                <li><strong>Drug-Drug:</strong> One drug affects another</li>
                                <li><strong>Drug-Food:</strong> Food affects drug absorption</li>
                                <li><strong>Drug-Disease:</strong> Drug worsens a condition</li>
                            </ul>

                            <div class="note-example">
                                <h4>Examples:</h4>
                                <ul>
                                    <li>Warfarin + Aspirin = Increased bleeding risk</li>
                                    <li>Tetracycline + Milk = Reduced absorption</li>
                                    <li>NSAIDs in peptic ulcer = Worsening of ulcer</li>
                                </ul>
                            </div>

                            <h3>1.7 Adverse Drug Reactions (ADRs)</h3>
                            
                            <h4>Types:</h4>
                            <ul>
                                <li><strong>Type A:</strong> Predictable, dose-related (e.g., drowsiness from antihistamines)</li>
                                <li><strong>Type B:</strong> Unpredictable, not dose-related (e.g., allergic reactions)</li>
                            </ul>

                            <h4>Management:</h4>
                            <ul>
                                <li>Stop the offending drug</li>
                                <li>Provide supportive care</li>
                                <li>Report to authorities (pharmacovigilance)</li>
                                <li>Document in patient record</li>
                            </ul>

                            <h3>1.8 Drug Storage</h3>
                            <ul>
                                <li>Store in cool, dry place</li>
                                <li>Protect from light and moisture</li>
                                <li>Keep out of reach of children</li>
                                <li>Check expiry dates regularly</li>
                                <li>Refrigerate when required (insulin, vaccines)</li>
                                <li>Separate internal and external use drugs</li>
                                <li>Lock controlled substances</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>Explain the four processes of pharmacokinetics (ADME).</li>
                                <li>List the advantages and disadvantages of oral drug administration.</li>
                                <li>What are the 5 rights of drug administration?</li>
                                <li>Name three classes of antihypertensive drugs with examples.</li>
                                <li>Describe proper insulin storage and administration.</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Always verify the 5 rights before giving medication</li>
                                <li>Different routes have different onset times and effects</li>
                                <li>Complete antibiotic courses to prevent resistance</li>
                                <li>Monitor for adverse drug reactions</li>
                                <li>Proper drug storage is essential for efficacy</li>
                                <li>Document all medication administration</li>
                            </ul>
                        `
                    }
                ]
            }
        }
    },

    // Pharmacy Program (I'll add a couple of subjects as examples)
    pharmacy: {
        programName: 'Pharmacy',
        programIcon: 'fas fa-prescription-bottle-alt',
        year1: {
            yearName: '1st Year',
            subjects: {
                chemistry: [
                    {
                        id: 'ph1c1',
                        title: 'Chapter 1: Pharmaceutical Chemistry Fundamentals',
                        description: 'Chemical principles in pharmaceutical sciences',
                        topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Analytical Chemistry', 'Reactions'],
                        viewLink: 'note-detail.html?id=ph1c1',
                        lastUpdated: '2024-01-19',
                        readTime: 22,
                        content: `
                            <h2>Pharmaceutical Chemistry Fundamentals</h2>
                            
                            <h3>1.1 Introduction to Pharmaceutical Chemistry</h3>
                            <p>Pharmaceutical chemistry is the study of drugs, their chemical properties, synthesis, and how they interact with biological systems. It forms the foundation for understanding drug action and development.</p>

                            <h3>1.2 Organic Chemistry in Pharmacy</h3>
                            
                            <h4>A. Functional Groups</h4>
                            <p>Functional groups are specific groups of atoms that determine the chemical properties of organic compounds.</p>
                            
                            <h5>Important Functional Groups:</h5>
                            <ul>
                                <li><strong>Hydroxyl (-OH):</strong> Found in alcohols, phenols</li>
                                <li><strong>Carbonyl (C=O):</strong> Found in aldehydes, ketones</li>
                                <li><strong>Carboxyl (-COOH):</strong> Found in carboxylic acids</li>
                                <li><strong>Amino (-NH₂):</strong> Found in amines, amino acids</li>
                                <li><strong>Ester (-COO-):</strong> Found in many drugs</li>
                                <li><strong>Amide (-CONH-):</strong> Found in proteins, many drugs</li>
                            </ul>

                            <div class="note-example">
                                <h4>Examples in Drugs:</h4>
                                <ul>
                                    <li><strong>Aspirin:</strong> Contains carboxyl and ester groups</li>
                                    <li><strong>Paracetamol:</strong> Contains hydroxyl and amide groups</li>
                                    <li><strong>Morphine:</strong> Contains hydroxyl and amine groups</li>
                                </ul>
                            </div>

                            <h4>B. Isomerism</h4>
                            <p>Isomers are compounds with the same molecular formula but different structures.</p>
                            
                            <h5>Types:</h5>
                            <ul>
                                <li><strong>Structural Isomers:</strong> Different connectivity of atoms</li>
                                <li><strong>Stereoisomers:</strong> Same connectivity, different spatial arrangement</li>
                                <li><strong>Enantiomers:</strong> Mirror images (important in drug activity)</li>
                            </ul>

                            <p><strong>Pharmaceutical Importance:</strong> Different isomers can have different biological activities. Example: Thalidomide - one enantiomer is therapeutic, the other causes birth defects.</p>

                            <h3>1.3 Inorganic Chemistry in Pharmacy</h3>
                            
                            <h4>A. Acids and Bases</h4>
                            <p>Understanding acid-base chemistry is crucial for drug formulation and stability.</p>
                            
                            <h5>Pharmaceutical Applications:</h5>
                            <ul>
                                <li><strong>Buffer Solutions:</strong> Maintain pH in formulations</li>
                                <li><strong>Salt Formation:</strong> Improve drug solubility and stability</li>
                                <li><strong>Antacids:</strong> Neutralize stomach acid</li>
                            </ul>

                            <div class="note-example">
                                <h4>Common Pharmaceutical Salts:</h4>
                                <ul>
                                    <li>Sodium chloride (NaCl) - IV solutions</li>
                                <li>Calcium carbonate (CaCO₃) - Antacid</li>
                                    <li>Magnesium hydroxide (Mg(OH)₂) - Antacid, laxative</li>
                                    <li>Aluminum hydroxide (Al(OH)₃) - Antacid</li>
                                </ul>
                            </div>

                            <h4>B. Oxidation-Reduction Reactions</h4>
                            <p>Redox reactions are important in drug metabolism and stability.</p>
                            <ul>
                                <li><strong>Oxidation:</strong> Loss of electrons, gain of oxygen</li>
                                <li><strong>Reduction:</strong> Gain of electrons, loss of oxygen</li>
                            </ul>

                            <h3>1.4 Analytical Chemistry</h3>
                            
                            <h4>A. Qualitative Analysis</h4>
                            <p>Identification of substances present in a sample.</p>
                            
                            <h5>Methods:</h5>
                            <ul>
                                <li><strong>Chemical Tests:</strong> Color reactions, precipitation</li>
                                <li><strong>Chromatography:</strong> TLC, HPLC, GC</li>
                                <li><strong>Spectroscopy:</strong> UV-Vis, IR, NMR</li>
                            </ul>

                            <h4>B. Quantitative Analysis</h4>
                            <p>Determination of the amount of substance present.</p>
                            
                            <h5>Methods:</h5>
                            <ul>
                                <li><strong>Titration:</strong> Acid-base, redox, complexometric</li>
                                <li><strong>Gravimetric Analysis:</strong> Weighing precipitates</li>
                                <li><strong>Instrumental Methods:</strong> Spectrophotometry, chromatography</li>
                            </ul>

                            <h3>1.5 Drug Stability</h3>
                            
                            <h4>Factors Affecting Stability:</h4>
                            <ul>
                                <li><strong>Temperature:</strong> Higher temperature increases degradation</li>
                                <li><strong>Light:</strong> Photodegradation of light-sensitive drugs</li>
                                <li><strong>Moisture:</strong> Hydrolysis reactions</li>
                                <li><strong>pH:</strong> Affects ionization and stability</li>
                                <li><strong>Oxygen:</strong> Oxidation reactions</li>
                            </ul>

                            <h4>Stabilization Methods:</h4>
                            <ul>
                                <li>Use of antioxidants (vitamin E, BHT)</li>
                                <li>pH adjustment with buffers</li>
                                <li>Protection from light (amber bottles)</li>
                                <li>Moisture control (desiccants)</li>
                                <li>Refrigeration when needed</li>
                            </ul>

                            <h3>1.6 Pharmaceutical Calculations</h3>
                            
                            <h4>A. Concentration Calculations</h4>
                            
                            <h5>Percentage Concentration:</h5>
                            <ul>
                                <li><strong>% w/w:</strong> grams of solute per 100g of solution</li>
                                <li><strong>% w/v:</strong> grams of solute per 100mL of solution</li>
                                <li><strong>% v/v:</strong> mL of solute per 100mL of solution</li>
                            </ul>

                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>Calculate the amount of drug in 500mL of 5% w/v solution.</p>
                                <p><strong>Solution:</strong></p>
                                <p>5% w/v means 5g in 100mL</p>
                                <p>In 500mL: (5g/100mL) × 500mL = 25g</p>
                            </div>

                            <h4>B. Dilution Calculations</h4>
                            <p><strong>Formula:</strong> C₁V₁ = C₂V₂</p>
                            <p>Where: C = concentration, V = volume</p>

                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>How much 10% solution is needed to make 200mL of 2% solution?</p>
                                <p><strong>Solution:</strong></p>
                                <p>C₁V₁ = C₂V₂</p>
                                <p>10% × V₁ = 2% × 200mL</p>
                                <p>V₁ = (2 × 200)/10 = 40mL</p>
                                <p>Take 40mL of 10% solution and add water to make 200mL</p>
                            </div>

                            <h3>1.7 Quality Control in Pharmacy</h3>
                            
                            <h4>Tests for Drug Quality:</h4>
                            <ul>
                                <li><strong>Identity Tests:</strong> Confirm the drug is what it claims to be</li>
                                <li><strong>Purity Tests:</strong> Check for impurities and contaminants</li>
                                <li><strong>Assay:</strong> Determine the amount of active ingredient</li>
                                <li><strong>Dissolution Test:</strong> Check how fast drug dissolves</li>
                                <li><strong>Stability Testing:</strong> Ensure drug remains effective over time</li>
                            </ul>

                            <h3>1.8 Good Manufacturing Practices (GMP)</h3>
                            <p>GMP ensures pharmaceutical products are consistently produced and controlled according to quality standards.</p>
                            
                            <h4>Key Principles:</h4>
                            <ul>
                                <li>Qualified personnel</li>
                                <li>Adequate facilities and equipment</li>
                                <li>Validated processes</li>
                                <li>Proper documentation</li>
                                <li>Quality control testing</li>
                                <li>Complaint handling system</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>Name five important functional groups in pharmaceutical chemistry.</li>
                                <li>Explain the pharmaceutical importance of isomerism.</li>
                                <li>List five factors that affect drug stability.</li>
                                <li>Calculate the amount of drug in 250mL of 10% w/v solution.</li>
                                <li>What are the key principles of Good Manufacturing Practices?</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Functional groups determine drug properties and activity</li>
                                <li>Isomers can have different biological effects</li>
                                <li>pH and stability are crucial in drug formulation</li>
                                <li>Analytical methods ensure drug quality</li>
                                <li>Pharmaceutical calculations are essential for accurate dosing</li>
                                <li>GMP ensures consistent product quality</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        year2: {
            yearName: '2nd Year',
            subjects: {
                pharmacology: [
                    {
                        id: 'ph2pl1',
                        title: 'Introduction to Pharmacology',
                        description: 'Drug action, mechanisms, and therapeutic uses',
                        topics: ['Drug Mechanisms', 'Pharmacokinetics', 'Pharmacodynamics', 'Drug Classes'],
                        viewLink: 'note-detail.html?id=ph2pl1',
                        lastUpdated: '2024-02-11',
                        readTime: 30,
                        content: `
                            <h2>Introduction to Pharmacology</h2>
                            
                            <h3>1.1 What is Pharmacology?</h3>
                            <p>Pharmacology is the science that studies drugs and their interactions with living systems. It encompasses drug discovery, development, and therapeutic use.</p>

                            <h4>Branches of Pharmacology:</h4>
                            <ul>
                                <li><strong>Pharmacokinetics:</strong> What the body does to the drug</li>
                                <li><strong>Pharmacodynamics:</strong> What the drug does to the body</li>
                                <li><strong>Pharmacotherapeutics:</strong> Use of drugs in treating disease</li>
                                <li><strong>Toxicology:</strong> Study of harmful effects of drugs</li>
                                <li><strong>Pharmacogenomics:</strong> How genes affect drug response</li>
                            </ul>

                            <h3>1.2 Pharmacokinetics in Detail</h3>
                            
                            <h4>A. Absorption</h4>
                            <p>The process by which a drug enters the bloodstream from its site of administration.</p>
                            
                            <h5>Factors Affecting Absorption:</h5>
                            <ul>
                                <li><strong>Route of Administration:</strong> IV (100%), oral (variable)</li>
                                <li><strong>Drug Properties:</strong> Lipid solubility, molecular size</li>
                                <li><strong>Blood Flow:</strong> Higher flow = faster absorption</li>
                                <li><strong>Surface Area:</strong> Small intestine has large surface area</li>
                                <li><strong>pH:</strong> Affects ionization and absorption</li>
                            </ul>

                            <h5>Bioavailability:</h5>
                            <p>The fraction of administered drug that reaches systemic circulation unchanged.</p>
                            <p><strong>Formula:</strong> F = (AUC oral / AUC IV) × 100%</p>
                            <ul>
                                <li>IV route: 100% bioavailability</li>
                                <li>Oral route: Variable (affected by first-pass metabolism)</li>
                            </ul>

                            <h4>B. Distribution</h4>
                            <p>Movement of drug from bloodstream to tissues and organs.</p>
                            
                            <h5>Volume of Distribution (Vd):</h5>
                            <p>Theoretical volume in which drug is distributed.</p>
                            <p><strong>Formula:</strong> Vd = Dose / Plasma concentration</p>
                            <ul>
                                <li>Low Vd: Drug stays in blood (e.g., warfarin)</li>
                                <li>High Vd: Drug distributes widely in tissues (e.g., digoxin)</li>
                            </ul>

                            <h5>Factors Affecting Distribution:</h5>
                            <ul>
                                <li><strong>Protein Binding:</strong> Only free drug is active</li>
                                <li><strong>Blood-Brain Barrier:</strong> Limits drug entry to brain</li>
                                <li><strong>Placental Barrier:</strong> Protects fetus (partially)</li>
                                <li><strong>Tissue Permeability:</strong> Lipid-soluble drugs cross easily</li>
                            </ul>

                            <h4>C. Metabolism (Biotransformation)</h4>
                            <p>Chemical modification of drugs, primarily in the liver.</p>
                            
                            <h5>Phase I Reactions:</h5>
                            <ul>
                                <li><strong>Oxidation:</strong> Most common (cytochrome P450 enzymes)</li>
                                <li><strong>Reduction:</strong> Less common</li>
                                <li><strong>Hydrolysis:</strong> Breaking bonds with water</li>
                            </ul>
                            <p><strong>Result:</strong> Usually produces more polar (water-soluble) metabolites</p>

                            <h5>Phase II Reactions:</h5>
                            <ul>
                                <li><strong>Conjugation:</strong> Adding groups (glucuronide, sulfate, acetyl)</li>
                                <li><strong>Result:</strong> Highly polar, easily excreted metabolites</li>
                            </ul>

                            <h5>First-Pass Metabolism:</h5>
                            <p>Metabolism of drug in liver before reaching systemic circulation (for oral drugs).</p>
                            <p><strong>Example:</strong> Nitroglycerin has high first-pass metabolism, so given sublingually</p>

                            <h4>D. Excretion</h4>
                            <p>Elimination of drug and metabolites from the body.</p>
                            
                            <h5>Renal Excretion (Main Route):</h5>
                            <ul>
                                <li><strong>Glomerular Filtration:</strong> Passive filtration</li>
                                <li><strong>Tubular Secretion:</strong> Active transport</li>
                                <li><strong>Tubular Reabsorption:</strong> Passive reabsorption</li>
                            </ul>

                            <h5>Other Routes:</h5>
                            <ul>
                                <li><strong>Biliary:</strong> Liver → bile → feces</li>
                                <li><strong>Pulmonary:</strong> Exhaled air (volatile drugs, anesthetics)</li>
                                <li><strong>Others:</strong> Sweat, saliva, breast milk</li>
                            </ul>

                            <h5>Half-Life (t½):</h5>
                            <p>Time required for plasma concentration to decrease by 50%.</p>
                            <ul>
                                <li>Short t½: Frequent dosing needed</li>
                                <li>Long t½: Less frequent dosing, risk of accumulation</li>
                                <li>Steady state reached after 4-5 half-lives</li>
                            </ul>

                            <h3>1.3 Pharmacodynamics</h3>
                            
                            <h4>A. Drug-Receptor Interactions</h4>
                            <p>Most drugs act by binding to specific receptors.</p>
                            
                            <h5>Types of Drug-Receptor Bonds:</h5>
                            <ul>
                                <li><strong>Covalent Bonds:</strong> Strong, irreversible (e.g., aspirin)</li>
                                <li><strong>Ionic Bonds:</strong> Moderate strength</li>
                                <li><strong>Hydrogen Bonds:</strong> Weak, reversible</li>
                                <li><strong>Van der Waals Forces:</strong> Very weak</li>
                            </ul>

                            <h4>B. Types of Drug Action</h4>
                            
                            <h5>1. Agonists</h5>
                            <p>Drugs that bind to receptors and activate them.</p>
                            <ul>
                                <li><strong>Full Agonist:</strong> Produces maximum response</li>
                                <li><strong>Partial Agonist:</strong> Produces submaximal response</li>
                            </ul>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>Morphine is a full agonist at opioid receptors</p>
                            </div>

                            <h5>2. Antagonists</h5>
                            <p>Drugs that bind to receptors but don't activate them, blocking agonist action.</p>
                            <ul>
                                <li><strong>Competitive:</strong> Can be overcome by increasing agonist dose</li>
                                <li><strong>Non-competitive:</strong> Cannot be overcome</li>
                            </ul>
                            <div class="note-example">
                                <h4>Example:</h4>
                                <p>Naloxone is an antagonist at opioid receptors (reverses morphine effects)</p>
                            </div>

                            <h4>C. Dose-Response Relationship</h4>
                            <p>The relationship between drug dose and the magnitude of response.</p>
                            
                            <h5>Key Concepts:</h5>
                            <ul>
                                <li><strong>ED50:</strong> Dose producing 50% of maximum effect</li>
                                <li><strong>LD50:</strong> Dose lethal to 50% of population</li>
                                <li><strong>Therapeutic Index:</strong> TI = LD50 / ED50 (safety margin)</li>
                                <li><strong>Potency:</strong> Amount of drug needed for effect</li>
                                <li><strong>Efficacy:</strong> Maximum effect a drug can produce</li>
                            </ul>

                            <h3>1.4 Drug Interactions</h3>
                            
                            <h4>A. Pharmacokinetic Interactions</h4>
                            <ul>
                                <li><strong>Absorption:</strong> Antacids reduce tetracycline absorption</li>
                                <li><strong>Distribution:</strong> Displacement from protein binding</li>
                                <li><strong>Metabolism:</strong> Enzyme induction or inhibition</li>
                                <li><strong>Excretion:</strong> Competition for renal secretion</li>
                            </ul>

                            <h4>B. Pharmacodynamic Interactions</h4>
                            <ul>
                                <li><strong>Synergism:</strong> Combined effect > sum of individual effects</li>
                                <li><strong>Additive:</strong> Combined effect = sum of individual effects</li>
                                <li><strong>Antagonism:</strong> One drug opposes another's effect</li>
                            </ul>

                            <div class="note-example">
                                <h4>Important Interactions:</h4>
                                <ul>
                                    <li>Warfarin + Aspirin = Increased bleeding risk</li>
                                    <li>Alcohol + Sedatives = Enhanced CNS depression</li>
                                    <li>Grapefruit juice + Statins = Increased drug levels</li>
                                </ul>
                            </div>

                            <h3>1.5 Adverse Drug Reactions</h3>
                            
                            <h4>Classification:</h4>
                            <ul>
                                <li><strong>Type A (Augmented):</strong> Dose-related, predictable</li>
                                <li><strong>Type B (Bizarre):</strong> Not dose-related, unpredictable</li>
                                <li><strong>Type C (Chronic):</strong> Related to cumulative dose</li>
                                <li><strong>Type D (Delayed):</strong> Occurs after prolonged use</li>
                                <li><strong>Type E (End of use):</strong> Withdrawal reactions</li>
                            </ul>

                            <h4>Common ADRs:</h4>
                            <ul>
                                <li><strong>Allergic Reactions:</strong> Rash, anaphylaxis</li>
                                <li><strong>Idiosyncratic Reactions:</strong> Unpredictable, genetic</li>
                                <li><strong>Toxic Effects:</strong> Overdose, organ damage</li>
                                <li><strong>Teratogenic Effects:</strong> Birth defects</li>
                            </ul>

                            <h3>1.6 Factors Affecting Drug Response</h3>
                            
                            <h4>Patient Factors:</h4>
                            <ul>
                                <li><strong>Age:</strong> Neonates and elderly need dose adjustment</li>
                                <li><strong>Weight:</strong> Affects volume of distribution</li>
                                <li><strong>Gender:</strong> Hormonal differences affect metabolism</li>
                                <li><strong>Genetics:</strong> Enzyme polymorphisms</li>
                                <li><strong>Disease States:</strong> Liver/kidney disease affects clearance</li>
                                <li><strong>Pregnancy:</strong> Altered pharmacokinetics</li>
                            </ul>

                            <h4>Drug Factors:</h4>
                            <ul>
                                <li><strong>Formulation:</strong> Immediate vs sustained release</li>
                                <li><strong>Route:</strong> Affects bioavailability</li>
                                <li><strong>Timing:</strong> With or without food</li>
                            </ul>

                            <h3>1.7 Tolerance and Dependence</h3>
                            
                            <h4>Tolerance:</h4>
                            <p>Decreased response to drug after repeated use, requiring higher doses.</p>
                            <ul>
                                <li><strong>Pharmacokinetic:</strong> Increased metabolism</li>
                                <li><strong>Pharmacodynamic:</strong> Receptor changes</li>
                            </ul>

                            <h4>Dependence:</h4>
                            <ul>
                                <li><strong>Physical:</strong> Withdrawal symptoms on stopping</li>
                                <li><strong>Psychological:</strong> Craving for drug</li>
                            </ul>

                            <h3>Practice Questions</h3>
                            <ol>
                                <li>Explain the four processes of pharmacokinetics with examples.</li>
                                <li>What is the difference between agonists and antagonists?</li>
                                <li>Define therapeutic index and explain its importance.</li>
                                <li>List five factors that affect drug response.</li>
                                <li>Describe the types of adverse drug reactions.</li>
                            </ol>

                            <h3>Key Points to Remember</h3>
                            <ul>
                                <li>Pharmacokinetics: ADME (Absorption, Distribution, Metabolism, Excretion)</li>
                                <li>Pharmacodynamics: Drug-receptor interactions</li>
                                <li>Therapeutic index indicates drug safety margin</li>
                                <li>Drug interactions can be pharmacokinetic or pharmacodynamic</li>
                                <li>Patient factors significantly affect drug response</li>
                                <li>Always monitor for adverse drug reactions</li>
                            </ul>
                        `
                    }
                ]
            }
        }
    }
};

// Helper function to get subject display name
function getSubjectDisplayName(subjectKey) {
    const subjectNames = {
        // HA Subjects
        physics: 'Physics',
        chemistry: 'Chemistry',
        zoology: 'Zoology',
        botany: 'Botany',
        anatomy: 'Anatomy',
        mathematics: 'Mathematics',
        medicine1: 'Medicine I',
        surgery1: 'Surgery I',
        pathology: 'Chemical Pathology',
        obstetrics: 'Obstetrics & Gynecology',
        procedures: 'Basic Medical Procedures & First Aid',
        pharmacology: 'Pharmacology & Pharmacy',
        environmental: 'Environmental Health',
        healthedu: 'Health Education',
        primarycare: 'Primary Health Care / Family Health',
        medicine2: 'Medicine II',
        surgery2: 'Surgery II',
        management: 'Health Management',
        epidemiology: 'Epidemiology & Community Diagnosis',
        clinical: 'Comprehensive Clinical Practicum',
        community: 'Comprehensive Community Field Practicum',
        // Pharmacy Subjects
        pharmacognosy: 'Pharmacognosy',
        biochemistry: 'Biochemistry & Microbiology',
        therapeutics: 'Pharmacology & Therapeutics',
        pharmaceutics: 'Pharmaceutics',
        hospital: 'Hospital & Clinical Pharmacy',
        forensic: 'Forensic & Community Pharmacy',
        healthcare: 'Health Care System & First Aid',
        practice: 'Comprehensive Professional Field Practice'
    };
    
    return subjectNames[subjectKey] || subjectKey;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ctevtDatabase, getSubjectDisplayName };
}