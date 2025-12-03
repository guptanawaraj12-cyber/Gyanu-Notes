// Complete note details database
const noteDetailsDatabase = {
    1: {
        title: "Mechanics - Motion in a Straight Line",
        subject: "physics",
        class: "11",
        date: "2024-01-15",
        views: 2450,
        category: "Physics",
        tags: ["mechanics", "motion", "kinematics", "velocity", "acceleration"],
        content: `
            <h2>Introduction to Motion</h2>
            <p>Motion is the change in position of an object with respect to time. In this chapter, we study motion in a straight line, also called one-dimensional motion.</p>
            
            <h3>1. Basic Concepts</h3>
            <h4>Position and Displacement</h4>
            <p><strong>Position:</strong> The location of an object at a particular instant of time.</p>
            <p><strong>Displacement:</strong> The change in position of an object. It is a vector quantity.</p>
            <p>Formula: <code>Δx = x₂ - x₁</code></p>
            
            <h4>Distance vs Displacement</h4>
            <ul>
                <li><strong>Distance:</strong> Total path length covered (scalar)</li>
                <li><strong>Displacement:</strong> Shortest distance between initial and final position (vector)</li>
            </ul>
            
            <h3>2. Velocity and Speed</h3>
            <h4>Average Velocity</h4>
            <p>Average velocity is the displacement divided by time interval.</p>
            <p><strong>Formula:</strong> <code>v_avg = Δx / Δt</code></p>
            
            <h4>Instantaneous Velocity</h4>
            <p>Velocity at a particular instant of time.</p>
            <p><strong>Formula:</strong> <code>v = dx/dt</code></p>
            
            <h4>Speed vs Velocity</h4>
            <ul>
                <li><strong>Speed:</strong> Distance per unit time (scalar)</li>
                <li><strong>Velocity:</strong> Displacement per unit time (vector)</li>
            </ul>
            
            <h3>3. Acceleration</h3>
            <p>Acceleration is the rate of change of velocity with respect to time.</p>
            <p><strong>Average Acceleration:</strong> <code>a_avg = Δv / Δt</code></p>
            <p><strong>Instantaneous Acceleration:</strong> <code>a = dv/dt = d²x/dt²</code></p>
            
            <h3>4. Equations of Motion</h3>
            <p>For uniformly accelerated motion, we have three equations:</p>
            
            <h4>First Equation</h4>
            <p><code>v = u + at</code></p>
            <p>Where: v = final velocity, u = initial velocity, a = acceleration, t = time</p>
            
            <h4>Second Equation</h4>
            <p><code>s = ut + ½at²</code></p>
            <p>Where: s = displacement</p>
            
            <h4>Third Equation</h4>
            <p><code>v² = u² + 2as</code></p>
            
            <h3>5. Graphical Representation</h3>
            
            <h4>Position-Time Graph</h4>
            <ul>
                <li>Slope gives velocity</li>
                <li>Straight line → uniform velocity</li>
                <li>Curved line → non-uniform velocity</li>
            </ul>
            
            <h4>Velocity-Time Graph</h4>
            <ul>
                <li>Slope gives acceleration</li>
                <li>Area under curve gives displacement</li>
                <li>Horizontal line → uniform velocity</li>
            </ul>
            
            <h3>6. Free Fall</h3>
            <p>Motion under gravity alone is called free fall.</p>
            <ul>
                <li>Acceleration due to gravity: <code>g = 9.8 m/s²</code></li>
                <li>For upward motion: <code>a = -g</code></li>
                <li>For downward motion: <code>a = +g</code></li>
            </ul>
            
            <h3>Practice Problems</h3>
            
            <p><strong>Problem 1:</strong> A car accelerates from rest to 20 m/s in 5 seconds. Find the acceleration.</p>
            <p><strong>Solution:</strong></p>
            <p>Given: u = 0, v = 20 m/s, t = 5 s</p>
            <p>Using v = u + at</p>
            <p>20 = 0 + a(5)</p>
            <p>a = 4 m/s²</p>
            
            <p><strong>Problem 2:</strong> A ball is thrown vertically upward with velocity 30 m/s. Find maximum height reached.</p>
            <p><strong>Solution:</strong></p>
            <p>Given: u = 30 m/s, v = 0 (at max height), a = -9.8 m/s²</p>
            <p>Using v² = u² + 2as</p>
            <p>0 = (30)² + 2(-9.8)s</p>
            <p>s = 900 / 19.6 = 45.9 m</p>
            
            <h3>Important Points to Remember</h3>
            <ul>
                <li>Displacement can be zero even if distance is not zero</li>
                <li>Average speed ≥ magnitude of average velocity</li>
                <li>Acceleration can be negative (retardation/deceleration)</li>
                <li>At maximum height, velocity = 0 but acceleration = g</li>
                <li>Time of ascent = Time of descent (for projectile motion)</li>
            </ul>
            
            <h3>Key Formulas Summary</h3>
            <ul>
                <li>v = u + at</li>
                <li>s = ut + ½at²</li>
                <li>v² = u² + 2as</li>
                <li>s_nth = u + a(2n-1)/2</li>
            </ul>
        `
    },
    
    21: {
        title: "Data Structures and Algorithms",
        subject: "computer",
        class: "bachelor",
        date: "2024-01-10",
        views: 3500,
        category: "Computer Science",
        tags: ["dsa", "algorithms", "data structures", "programming"],
        content: `
            <h2>Introduction to Data Structures and Algorithms</h2>
            <p>Data Structures and Algorithms (DSA) form the foundation of computer science and programming. Understanding DSA is crucial for writing efficient code and solving complex problems.</p>
            
            <h3>1. What are Data Structures?</h3>
            <p>Data structures are ways of organizing and storing data in a computer so that it can be accessed and modified efficiently.</p>
            
            <h4>Types of Data Structures</h4>
            <ul>
                <li><strong>Primitive:</strong> int, float, char, boolean</li>
                <li><strong>Non-Primitive:</strong> Arrays, Linked Lists, Stacks, Queues, Trees, Graphs</li>
            </ul>
            
            <h3>2. Arrays</h3>
            <p>An array is a collection of elements of the same type stored in contiguous memory locations.</p>
            
            <h4>Characteristics</h4>
            <ul>
                <li>Fixed size</li>
                <li>Random access: O(1)</li>
                <li>Insertion/Deletion: O(n)</li>
            </ul>
            
            <h4>Array Operations</h4>
            <pre><code>// Array declaration in C++
int arr[5] = {1, 2, 3, 4, 5};

// Accessing elements
int first = arr[0];  // O(1)

// Traversing array
for(int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}</code></pre>
            
            <h3>3. Linked Lists</h3>
            <p>A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node.</p>
            
            <h4>Types of Linked Lists</h4>
            <ul>
                <li><strong>Singly Linked List:</strong> Each node points to next node</li>
                <li><strong>Doubly Linked List:</strong> Each node points to both next and previous</li>
                <li><strong>Circular Linked List:</strong> Last node points to first node</li>
            </ul>
            
            <h4>Node Structure</h4>
            <pre><code>struct Node {
    int data;
    Node* next;
};</code></pre>
            
            <h4>Operations</h4>
            <ul>
                <li>Insertion at beginning: O(1)</li>
                <li>Insertion at end: O(n)</li>
                <li>Deletion: O(n)</li>
                <li>Search: O(n)</li>
            </ul>
            
            <h3>4. Stacks</h3>
            <p>Stack is a linear data structure that follows LIFO (Last In First Out) principle.</p>
            
            <h4>Operations</h4>
            <ul>
                <li><strong>Push:</strong> Add element to top - O(1)</li>
                <li><strong>Pop:</strong> Remove element from top - O(1)</li>
                <li><strong>Peek/Top:</strong> View top element - O(1)</li>
                <li><strong>isEmpty:</strong> Check if stack is empty - O(1)</li>
            </ul>
            
            <h4>Implementation</h4>
            <pre><code>class Stack {
    int top;
    int arr[MAX];
public:
    Stack() { top = -1; }
    
    void push(int x) {
        if(top >= MAX-1) {
            cout << "Stack Overflow";
            return;
        }
        arr[++top] = x;
    }
    
    int pop() {
        if(top < 0) {
            cout << "Stack Underflow";
            return -1;
        }
        return arr[top--];
    }
};</code></pre>
            
            <h4>Applications</h4>
            <ul>
                <li>Function call management</li>
                <li>Expression evaluation</li>
                <li>Undo mechanism</li>
                <li>Backtracking algorithms</li>
            </ul>
            
            <h3>5. Queues</h3>
            <p>Queue is a linear data structure that follows FIFO (First In First Out) principle.</p>
            
            <h4>Operations</h4>
            <ul>
                <li><strong>Enqueue:</strong> Add element to rear - O(1)</li>
                <li><strong>Dequeue:</strong> Remove element from front - O(1)</li>
                <li><strong>Front:</strong> View front element - O(1)</li>
                <li><strong>Rear:</strong> View rear element - O(1)</li>
            </ul>
            
            <h4>Types of Queues</h4>
            <ul>
                <li>Simple Queue</li>
                <li>Circular Queue</li>
                <li>Priority Queue</li>
                <li>Double-ended Queue (Deque)</li>
            </ul>
            
            <h3>6. Trees</h3>
            <p>A tree is a hierarchical data structure with a root node and subtrees of children nodes.</p>
            
            <h4>Binary Tree</h4>
            <p>A tree where each node has at most two children (left and right).</p>
            
            <h4>Binary Search Tree (BST)</h4>
            <p>A binary tree where:</p>
            <ul>
                <li>Left subtree contains nodes with values less than parent</li>
                <li>Right subtree contains nodes with values greater than parent</li>
            </ul>
            
            <h4>Tree Traversals</h4>
            <ul>
                <li><strong>Inorder:</strong> Left → Root → Right</li>
                <li><strong>Preorder:</strong> Root → Left → Right</li>
                <li><strong>Postorder:</strong> Left → Right → Root</li>
                <li><strong>Level Order:</strong> Level by level</li>
            </ul>
            
            <h3>7. Sorting Algorithms</h3>
            
            <h4>Bubble Sort</h4>
            <p>Time Complexity: O(n²)</p>
            <pre><code>void bubbleSort(int arr[], int n) {
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}</code></pre>
            
            <h4>Selection Sort</h4>
            <p>Time Complexity: O(n²)</p>
            <p>Finds minimum element and places it at beginning.</p>
            
            <h4>Insertion Sort</h4>
            <p>Time Complexity: O(n²)</p>
            <p>Builds sorted array one element at a time.</p>
            
            <h4>Merge Sort</h4>
            <p>Time Complexity: O(n log n)</p>
            <p>Divide and conquer algorithm.</p>
            
            <h4>Quick Sort</h4>
            <p>Time Complexity: O(n log n) average, O(n²) worst</p>
            <p>Uses pivot element to partition array.</p>
            
            <h3>8. Searching Algorithms</h3>
            
            <h4>Linear Search</h4>
            <p>Time Complexity: O(n)</p>
            <pre><code>int linearSearch(int arr[], int n, int key) {
    for(int i = 0; i < n; i++) {
        if(arr[i] == key)
            return i;
    }
    return -1;
}</code></pre>
            
            <h4>Binary Search</h4>
            <p>Time Complexity: O(log n)</p>
            <p>Works only on sorted arrays.</p>
            <pre><code>int binarySearch(int arr[], int l, int r, int key) {
    while(l <= r) {
        int mid = l + (r - l) / 2;
        if(arr[mid] == key)
            return mid;
        if(arr[mid] < key)
            l = mid + 1;
        else
            r = mid - 1;
    }
    return -1;
}</code></pre>
            
            <h3>Time Complexity Comparison</h3>
            <table>
                <tr>
                    <th>Algorithm</th>
                    <th>Best</th>
                    <th>Average</th>
                    <th>Worst</th>
                </tr>
                <tr>
                    <td>Bubble Sort</td>
                    <td>O(n)</td>
                    <td>O(n²)</td>
                    <td>O(n²)</td>
                </tr>
                <tr>
                    <td>Selection Sort</td>
                    <td>O(n²)</td>
                    <td>O(n²)</td>
                    <td>O(n²)</td>
                </tr>
                <tr>
                    <td>Insertion Sort</td>
                    <td>O(n)</td>
                    <td>O(n²)</td>
                    <td>O(n²)</td>
                </tr>
                <tr>
                    <td>Merge Sort</td>
                    <td>O(n log n)</td>
                    <td>O(n log n)</td>
                    <td>O(n log n)</td>
                </tr>
                <tr>
                    <td>Quick Sort</td>
                    <td>O(n log n)</td>
                    <td>O(n log n)</td>
                    <td>O(n²)</td>
                </tr>
            </table>
            
            <h3>Important Points</h3>
            <ul>
                <li>Choose appropriate data structure based on requirements</li>
                <li>Arrays provide fast access but slow insertion/deletion</li>
                <li>Linked lists provide fast insertion/deletion but slow access</li>
                <li>Stacks and queues are useful for specific scenarios</li>
                <li>Trees provide hierarchical organization</li>
                <li>Always consider time and space complexity</li>
            </ul>
        `
    },
    
    33: {
        title: "Financial Accounting - Journal Entries",
        subject: "accountancy",
        class: "11",
        date: "2024-01-14",
        views: 2650,
        category: "Accountancy",
        tags: ["accounting", "journal", "ledger", "double entry"],
        content: `
            <h2>Introduction to Journal Entries</h2>
            <p>A journal is a book of original entry where all business transactions are recorded in chronological order before being posted to the ledger.</p>
            
            <h3>1. Double Entry System</h3>
            <p>Every transaction has two aspects - debit and credit. For every debit, there must be a corresponding credit of equal amount.</p>
            
            <h4>Golden Rules of Accounting</h4>
            <ul>
                <li><strong>Personal Account:</strong> Debit the receiver, Credit the giver</li>
                <li><strong>Real Account:</strong> Debit what comes in, Credit what goes out</li>
                <li><strong>Nominal Account:</strong> Debit all expenses and losses, Credit all incomes and gains</li>
            </ul>
            
            <h3>2. Format of Journal Entry</h3>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Particulars</th>
                    <th>L.F.</th>
                    <th>Debit (Rs.)</th>
                    <th>Credit (Rs.)</th>
                </tr>
                <tr>
                    <td>2024/01/01</td>
                    <td>Cash A/c Dr.<br>&nbsp;&nbsp;&nbsp;&nbsp;To Capital A/c<br>(Being capital introduced)</td>
                    <td></td>
                    <td>100,000</td>
                    <td><br>100,000</td>
                </tr>
            </table>
            
            <h3>3. Common Journal Entries</h3>
            
            <h4>Purchase of Goods</h4>
            <p><strong>Cash Purchase:</strong></p>
            <pre>Purchase A/c                Dr.     50,000
    To Cash A/c                         50,000
(Being goods purchased for cash)</pre>
            
            <p><strong>Credit Purchase:</strong></p>
            <pre>Purchase A/c                Dr.     50,000
    To Creditors A/c                    50,000
(Being goods purchased on credit)</pre>
            
            <h4>Sale of Goods</h4>
            <p><strong>Cash Sale:</strong></p>
            <pre>Cash A/c                    Dr.     60,000
    To Sales A/c                        60,000
(Being goods sold for cash)</pre>
            
            <p><strong>Credit Sale:</strong></p>
            <pre>Debtors A/c                 Dr.     60,000
    To Sales A/c                        60,000
(Being goods sold on credit)</pre>
            
            <h4>Payment of Expenses</h4>
            <pre>Rent A/c                    Dr.     10,000
    To Cash A/c                         10,000
(Being rent paid)</pre>
            
            <pre>Salary A/c                  Dr.     25,000
    To Cash A/c                         25,000
(Being salary paid)</pre>
            
            <h4>Receipt of Income</h4>
            <pre>Cash A/c                    Dr.     5,000
    To Commission A/c                   5,000
(Being commission received)</pre>
            
            <h4>Withdrawal by Owner</h4>
            <pre>Drawings A/c                Dr.     15,000
    To Cash A/c                         15,000
(Being cash withdrawn for personal use)</pre>
            
            <h3>4. Compound Journal Entries</h3>
            <p>When a transaction affects more than two accounts:</p>
            
            <pre>Purchase A/c                Dr.     40,000
Carriage Inward A/c         Dr.     2,000
    To Cash A/c                         42,000
(Being goods purchased and carriage paid)</pre>
            
            <h3>5. Adjustment Entries</h3>
            
            <h4>Outstanding Expenses</h4>
            <pre>Rent A/c                    Dr.     2,000
    To Outstanding Rent A/c             2,000
(Being rent outstanding)</pre>
            
            <h4>Prepaid Expenses</h4>
            <pre>Prepaid Insurance A/c       Dr.     3,000
    To Insurance A/c                    3,000
(Being insurance prepaid)</pre>
            
            <h4>Accrued Income</h4>
            <pre>Accrued Interest A/c        Dr.     1,500
    To Interest A/c                     1,500
(Being interest accrued)</pre>
            
            <h4>Depreciation</h4>
            <pre>Depreciation A/c            Dr.     10,000
    To Machinery A/c                    10,000
(Being depreciation charged)</pre>
            
            <h3>6. Closing Entries</h3>
            
            <h4>Transfer to Trading Account</h4>
            <pre>Trading A/c                 Dr.     XXX
    To Purchase A/c                     XXX
    To Carriage Inward A/c              XXX
    To Wages A/c                        XXX</pre>
            
            <pre>Sales A/c                   Dr.     XXX
    To Trading A/c                      XXX</pre>
            
            <h4>Transfer to Profit & Loss Account</h4>
            <pre>Profit & Loss A/c           Dr.     XXX
    To Rent A/c                         XXX
    To Salary A/c                       XXX
    To Interest A/c                     XXX</pre>
            
            <h3>7. Rectification Entries</h3>
            
            <h4>Error of Commission</h4>
            <p>Wrong amount posted:</p>
            <pre>Correct A/c                 Dr.     XXX
    To Wrong A/c                        XXX</pre>
            
            <h4>Error of Omission</h4>
            <p>Transaction not recorded - pass the original entry</p>
            
            <h3>Practice Problems</h3>
            
            <p><strong>Problem 1:</strong> Started business with cash Rs. 200,000</p>
            <p><strong>Solution:</strong></p>
            <pre>Cash A/c                    Dr.     200,000
    To Capital A/c                      200,000
(Being capital introduced)</pre>
            
            <p><strong>Problem 2:</strong> Purchased furniture for Rs. 50,000 paying 60% cash and balance on credit</p>
            <p><strong>Solution:</strong></p>
            <pre>Furniture A/c               Dr.     50,000
    To Cash A/c                         30,000
    To Creditors A/c                    20,000
(Being furniture purchased)</pre>
            
            <p><strong>Problem 3:</strong> Sold goods to Ram for Rs. 80,000 at 10% trade discount</p>
            <p><strong>Solution:</strong></p>
            <pre>Ram A/c                     Dr.     72,000
    To Sales A/c                        72,000
(Being goods sold to Ram at 10% discount)</pre>
            
            <h3>Important Points</h3>
            <ul>
                <li>Always write "Dr." after the account to be debited</li>
                <li>Credit entries are indented (moved to right)</li>
                <li>Narration is written in brackets</li>
                <li>Total of debit side must equal total of credit side</li>
                <li>Date should be written in chronological order</li>
                <li>Trade discount is not recorded in books</li>
                <li>Cash discount is recorded in books</li>
            </ul>
        `
    },      
    
   2: {
     title: "Newton's Laws of Motion",
            description: "Detailed explanation of three laws with examples, applications and problem solving",
            class: "11",
            date: "2024-01-20",
            views: 2100,
            tags: ["newton", "laws", "force", "mechanics"],
            content: `
                <h2>Newton's Laws of Motion</h2>
                <p>Sir Isaac Newton formulated three fundamental laws that describe the relationship between motion and forces.</p>
                
                <h3>1. Newton's First Law (Law of Inertia)</h3>
                <p><strong>Statement:</strong> An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.</p>
                
                <h4>Inertia</h4>
                <p>Inertia is the tendency of an object to resist changes in its state of motion.</p>
                <ul>
                    <li><strong>Inertia of Rest:</strong> Tendency to remain at rest</li>
                    <li><strong>Inertia of Motion:</strong> Tendency to remain in motion</li>
                    <li><strong>Inertia of Direction:</strong> Tendency to maintain direction</li>
                </ul>
                
                <h4>Examples</h4>
                <ul>
                    <li>Passengers jerk forward when a bus suddenly stops</li>
                    <li>Dust particles fall off when a carpet is beaten</li>
                    <li>Athletes run before taking a long jump</li>
                </ul>
                
                <h3>2. Newton's Second Law (Law of Acceleration)</h3>
                <p><strong>Statement:</strong> The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
                
                <h4>Mathematical Form</h4>
                <p><code>F = ma</code></p>
                <p>Where: F = Force (Newton), m = mass (kg), a = acceleration (m/s²)</p>
                
                <h4>Unit of Force</h4>
                <p>1 Newton = 1 kg × 1 m/s²</p>
                <p>One newton is the force required to give a mass of 1 kg an acceleration of 1 m/s²</p>
                
                <h4>Applications</h4>
                <ul>
                    <li>Heavier objects require more force to accelerate</li>
                    <li>Same force produces different accelerations on different masses</li>
                    <li>Rocket propulsion uses this principle</li>
                </ul>
                
                <h3>3. Newton's Third Law (Action-Reaction Law)</h3>
                <p><strong>Statement:</strong> For every action, there is an equal and opposite reaction.</p>
                
                <h4>Key Points</h4>
                <ul>
                    <li>Action and reaction forces are equal in magnitude</li>
                    <li>They act in opposite directions</li>
                    <li>They act on different objects</li>
                    <li>They act simultaneously</li>
                </ul>
                
                <h4>Examples</h4>
                <ul>
                    <li>Walking: We push ground backward, ground pushes us forward</li>
                    <li>Swimming: We push water backward, water pushes us forward</li>
                    <li>Rocket propulsion: Gases expelled downward, rocket moves upward</li>
                    <li>Recoil of gun: Bullet moves forward, gun moves backward</li>
                </ul>
                
                <h3>4. Types of Forces</h3>
                <h4>Contact Forces</h4>
                <ul>
                    <li><strong>Normal Force:</strong> Perpendicular force from surface</li>
                    <li><strong>Friction:</strong> Opposes relative motion</li>
                    <li><strong>Tension:</strong> Force in stretched string/rope</li>
                    <li><strong>Spring Force:</strong> Restoring force in springs</li>
                </ul>
                
                <h4>Non-Contact Forces</h4>
                <ul>
                    <li><strong>Gravitational Force:</strong> Attraction between masses</li>
                    <li><strong>Electromagnetic Force:</strong> Between charged particles</li>
                    <li><strong>Nuclear Force:</strong> Between subatomic particles</li>
                </ul>
                
                <h3>5. Free Body Diagrams</h3>
                <p>A free body diagram shows all forces acting on an object.</p>
                <h4>Steps to Draw FBD</h4>
                <ol>
                    <li>Isolate the object</li>
                    <li>Draw all forces as arrows</li>
                    <li>Label each force</li>
                    <li>Choose coordinate system</li>
                </ol>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> A force of 50 N acts on a mass of 10 kg. Find acceleration.</p>
                <p><strong>Solution:</strong></p>
                <p>F = ma</p>
                <p>50 = 10 × a</p>
                <p>a = 5 m/s²</p>
                
                <p><strong>Problem 2:</strong> A 2 kg object accelerates at 3 m/s². Find the net force.</p>
                <p><strong>Solution:</strong></p>
                <p>F = ma = 2 × 3 = 6 N</p>
                
                <p><strong>Problem 3:</strong> A 1000 kg car accelerates from 0 to 20 m/s in 10 seconds. Find the force.</p>
                <p><strong>Solution:</strong></p>
                <p>a = (v - u) / t = (20 - 0) / 10 = 2 m/s²</p>
                <p>F = ma = 1000 × 2 = 2000 N</p>
                
                <h3>Important Formulas</h3>
                <ul>
                    <li>F = ma (Newton's Second Law)</li>
                    <li>Weight: W = mg</li>
                    <li>Friction: f = μN</li>
                    <li>Momentum: p = mv</li>
                    <li>Impulse: J = FΔt = Δp</li>
                </ul>
            `
        },
     3:{ 
        title: "Electricity and Magnetism - Class 12",
            description: "Electric field, magnetic field, electromagnetic induction, and applications",
            class: "12",
            date: "2024-02-05",
            views: 1650,
            tags: ["electricity", "magnetism", "induction", "field"],
            content: `
                <h2>Electricity and Magnetism</h2>
                
                <h3>1. Electric Charge</h3>
                <p>Electric charge is a fundamental property of matter that causes it to experience a force in an electromagnetic field.</p>
                
                <h4>Types of Charges</h4>
                <ul>
                    <li><strong>Positive Charge:</strong> Deficiency of electrons</li>
                    <li><strong>Negative Charge:</strong> Excess of electrons</li>
                </ul>
                
                <h4>Properties of Charge</h4>
                <ul>
                    <li>Like charges repel, unlike charges attract</li>
                    <li>Charge is quantized: q = ne (n = integer, e = 1.6 × 10⁻¹⁹ C)</li>
                    <li>Charge is conserved</li>
                    <li>Charge is additive</li>
                </ul>
                
                <h3>2. Coulomb's Law</h3>
                <p><strong>Statement:</strong> The force between two point charges is directly proportional to the product of charges and inversely proportional to the square of distance between them.</p>
                
                <h4>Formula</h4>
                <p><code>F = k(q₁q₂)/r²</code></p>
                <p>Where: k = 9 × 10⁹ Nm²/C² (Coulomb's constant)</p>
                
                <h3>3. Electric Field</h3>
                <p><strong>Definition:</strong> Electric field is the region around a charge where another charge experiences a force.</p>
                
                <h4>Electric Field Intensity</h4>
                <p><code>E = F/q = kQ/r²</code></p>
                <p>Unit: N/C or V/m</p>
                
                <h4>Electric Field Lines</h4>
                <ul>
                    <li>Start from positive charge, end at negative charge</li>
                    <li>Never intersect each other</li>
                    <li>Closer lines indicate stronger field</li>
                    <li>Tangent gives direction of field</li>
                </ul>
                
                <h3>4. Electric Potential</h3>
                <p><strong>Definition:</strong> Electric potential at a point is the work done in bringing a unit positive charge from infinity to that point.</p>
                
                <h4>Formula</h4>
                <p><code>V = W/q = kQ/r</code></p>
                <p>Unit: Volt (V)</p>
                
                <h4>Potential Difference</h4>
                <p><code>V = V₁ - V₂ = W/q</code></p>
                
                <h3>5. Capacitance</h3>
                <p><strong>Definition:</strong> Capacitance is the ability of a conductor to store charge.</p>
                
                <h4>Formula</h4>
                <p><code>C = Q/V</code></p>
                <p>Unit: Farad (F)</p>
                
                <h4>Parallel Plate Capacitor</h4>
                <p><code>C = ε₀A/d</code></p>
                <p>Where: ε₀ = permittivity of free space, A = area, d = distance</p>
                
                <h3>6. Current Electricity</h3>
                <p><strong>Electric Current:</strong> Rate of flow of charge.</p>
                <p><code>I = Q/t</code></p>
                <p>Unit: Ampere (A)</p>
                
                <h4>Ohm's Law</h4>
                <p><code>V = IR</code></p>
                <p>Where: V = voltage, I = current, R = resistance</p>
                
                <h4>Resistance</h4>
                <p><code>R = ρL/A</code></p>
                <p>Where: ρ = resistivity, L = length, A = area</p>
                
                <h3>7. Magnetic Field</h3>
                <p><strong>Definition:</strong> Region around a magnet where magnetic force is experienced.</p>
                
                <h4>Magnetic Field due to Current</h4>
                <p><strong>Straight Wire:</strong> <code>B = μ₀I/(2πr)</code></p>
                <p><strong>Circular Loop:</strong> <code>B = μ₀I/(2r)</code></p>
                <p><strong>Solenoid:</strong> <code>B = μ₀nI</code></p>
                
                <h3>8. Electromagnetic Induction</h3>
                <p><strong>Faraday's Law:</strong> Induced EMF is proportional to rate of change of magnetic flux.</p>
                <p><code>ε = -dΦ/dt</code></p>
                
                <h4>Lenz's Law</h4>
                <p>Direction of induced current opposes the change causing it.</p>
                
                <h3>Practice Problems</h3>
                
                <p><strong>Problem 1:</strong> Two charges of 2 μC and 3 μC are 10 cm apart. Find force between them.</p>
                <p><strong>Solution:</strong></p>
                <p>F = k(q₁q₂)/r² = (9×10⁹)(2×10⁻⁶)(3×10⁻⁶)/(0.1)²</p>
                <p>F = 5.4 N</p>
                
                <p><strong>Problem 2:</strong> A conductor has resistance 10 Ω. If 2 A current flows, find voltage.</p>
                <p><strong>Solution:</strong></p>
                <p>V = IR = 2 × 10 = 20 V</p>
                
                <h3>Important Formulas</h3>
                <ul>
                    <li>Coulomb's Law: F = kq₁q₂/r²</li>
                    <li>Electric Field: E = F/q = kQ/r²</li>
                    <li>Electric Potential: V = kQ/r</li>
                    <li>Capacitance: C = Q/V</li>
                    <li>Ohm's Law: V = IR</li>
                    <li>Power: P = VI = I²R = V²/R</li>
                    <li>Magnetic Field: B = μ₀I/(2πr)</li>
                    <li>Induced EMF: ε = -dΦ/dt</li>
                </ul>
            `
        },
        6: {
            title: "Organic Chemistry - Hydrocarbons",
            description: "Alkanes, alkenes, alkynes - nomenclature, properties, and reactions",
            class: "12",
            date: "2024-01-18",
            views: 2200,
            tags: ["organic", "hydrocarbons", "alkanes", "alkenes", "alkynes"],
            content: `
                <h2>Hydrocarbons</h2>
                <p>Hydrocarbons are organic compounds containing only carbon and hydrogen atoms.</p>
                
                <h3>1. Classification of Hydrocarbons</h3>
                <h4>A. Saturated Hydrocarbons (Alkanes)</h4>
                <p>Contains only single bonds between carbon atoms.</p>
                <p>General Formula: C<sub>n</sub>H<sub>2n+2</sub></p>
                
                <h4>B. Unsaturated Hydrocarbons</h4>
                <ul>
                    <li><strong>Alkenes:</strong> Contains one or more C=C double bonds (C<sub>n</sub>H<sub>2n</sub>)</li>
                    <li><strong>Alkynes:</strong> Contains one or more C≡C triple bonds (C<sub>n</sub>H<sub>2n-2</sub>)</li>
                </ul>
                
                <h3>2. Alkanes</h3>
                <h4>Nomenclature</h4>
                <table>
                    <tr>
                        <th>Carbon Atoms</th>
                        <th>Name</th>
                        <th>Formula</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Methane</td>
                        <td>CH₄</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ethane</td>
                        <td>C₂H₆</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Propane</td>
                        <td>C₃H₈</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Butane</td>
                        <td>C₄H₁₀</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Pentane</td>
                        <td>C₅H₁₂</td>
                    </tr>
                </table>
                
                <h4>Properties of Alkanes</h4>
                <ul>
                    <li>Non-polar molecules</li>
                    <li>Insoluble in water, soluble in organic solvents</li>
                    <li>Boiling point increases with molecular weight</li>
                    <li>Less reactive than alkenes and alkynes</li>
                </ul>
                
                <h4>Reactions of Alkanes</h4>
                
                <h4>1. Combustion</h4>
                <p>Complete combustion produces CO₂ and H₂O</p>
                <p>CH₄ + 2O₂ → CO₂ + 2H₂O + Heat</p>
                
                <h4>2. Halogenation</h4>
                <p>Substitution reaction with halogens in presence of light</p>
                <p>CH₄ + Cl₂ → CH₃Cl + HCl</p>
                
                <h3>3. Alkenes</h3>
                <h4>Nomenclature</h4>
                <table>
                    <tr>
                        <th>Carbon Atoms</th>
                        <th>Name</th>
                        <th>Formula</th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ethene (Ethylene)</td>
                        <td>C₂H₄</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Propene</td>
                        <td>C₃H₆</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Butene</td>
                        <td>C₄H₈</td>
                    </tr>
                </table>
                
                <h4>Properties of Alkenes</h4>
                <ul>
                    <li>More reactive than alkanes due to double bond</li>
                    <li>Undergo addition reactions</li>
                    <li>Show geometrical isomerism</li>
                </ul>
                
                <h4>Reactions of Alkenes</h4>
                
                <h4>1. Hydrogenation</h4>
                <p>Addition of hydrogen in presence of catalyst</p>
                <p>C₂H₄ + H₂ → C₂H₆</p>
                
                <h4>2. Halogenation</h4>
                <p>Addition of halogens</p>
                <p>C₂H₄ + Br₂ → C₂H₄Br₂</p>
                
                <h4>3. Hydrohalogenation</h4>
                <p>Addition of hydrogen halides (follows Markovnikov's rule)</p>
                <p>C₂H₄ + HBr → C₂H₅Br</p>
                
                <h4>4. Hydration</h4>
                <p>Addition of water in presence of acid</p>
                <p>C₂H₄ + H₂O → C₂H₅OH</p>
                
                <h4>5. Polymerization</h4>
                <p>Formation of polymers</p>
                <p>nC₂H₄ → (C₂H₄)ₙ (Polyethylene)</p>
                
                <h3>4. Alkynes</h3>
                <h4>Nomenclature</h4>
                <table>
                    <tr>
                        <th>Carbon Atoms</th>
                        <th>Name</th>
                        <th>Formula</th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Ethyne (Acetylene)</td>
                        <td>C₂H₂</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Propyne</td>
                        <td>C₃H₄</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Butyne</td>
                        <td>C₄H₆</td>
                    </tr>
                </table>
                
                <h4>Properties of Alkynes</h4>
                <ul>
                    <li>Most reactive among hydrocarbons</li>
                    <li>Acidic nature (terminal alkynes)</li>
                    <li>Undergo addition reactions</li>
                </ul>
                
                <h4>Reactions of Alkynes</h4>
                
                <h4>1. Hydrogenation</h4>
                <p>Complete: C₂H₂ + 2H₂ → C₂H₆</p>
                <p>Partial: C₂H₂ + H₂ → C₂H₄</p>
                
                <h4>2. Halogenation</h4>
                <p>C₂H₂ + 2Br₂ → C₂H₂Br₄</p>
                
                <h4>3. Hydration</h4>
                <p>C₂H₂ + H₂O → CH₃CHO (Acetaldehyde)</p>
                
                <h3>5. Isomerism in Hydrocarbons</h3>
                
                <h4>Structural Isomerism</h4>
                <p>Same molecular formula, different structural arrangement</p>
                <p>Example: C₄H₁₀ has two isomers:</p>
                <ul>
                    <li>n-Butane: CH₃-CH₂-CH₂-CH₃</li>
                    <li>Isobutane: CH₃-CH(CH₃)-CH₃</li>
                </ul>
                
                <h4>Geometrical Isomerism</h4>
                <p>Due to restricted rotation around double bond</p>
                <ul>
                    <li>Cis isomer: Similar groups on same side</li>
                    <li>Trans isomer: Similar groups on opposite sides</li>
                </ul>
                
                <h3>Practice Problems</h3>
                
                <p><strong>Problem 1:</strong> Write the molecular formula of alkane with 8 carbon atoms.</p>
                <p><strong>Solution:</strong></p>
                <p>Using C<sub>n</sub>H<sub>2n+2</sub></p>
                <p>C₈H₁₈</p>
                
                <p><strong>Problem 2:</strong> How many isomers does C₅H₁₂ have?</p>
                <p><strong>Solution:</strong></p>
                <p>Three isomers:</p>
                <ul>
                    <li>n-Pentane</li>
                    <li>Isopentane (2-methylbutane)</li>
                    <li>Neopentane (2,2-dimethylpropane)</li>
                </ul>
                
                <h3>Important Points</h3>
                <ul>
                    <li>Alkanes are least reactive, alkynes are most reactive</li>
                    <li>Alkanes undergo substitution, alkenes and alkynes undergo addition</li>
                    <li>Markovnikov's rule: In addition, H goes to carbon with more H</li>
                    <li>Boiling point increases with chain length</li>
                    <li>Branching decreases boiling point</li>
                </ul>
            `
        },
        7: {
            title: "Chemical Bonding and Molecular Structure",
            description: "Ionic, covalent, and metallic bonds with Lewis structures and VSEPR theory",
            class: "11",
            date: "2024-01-25",
            views: 1980,
            tags: ["bonding", "ionic", "covalent", "lewis", "vsepr"],
            content: `
                <h2>Chemical Bonding</h2>
                <p>Chemical bonding is the force of attraction that holds atoms together in molecules and compounds.</p>
                
                <h3>1. Types of Chemical Bonds</h3>
                
                <h4>A. Ionic Bond (Electrovalent Bond)</h4>
                <p><strong>Definition:</strong> Bond formed by complete transfer of electrons from one atom to another.</p>
                
                <h4>Characteristics</h4>
                <ul>
                    <li>Formed between metal and non-metal</li>
                    <li>Complete electron transfer</li>
                    <li>Forms ions (cations and anions)</li>
                    <li>Strong electrostatic attraction</li>
                </ul>
                
                <h4>Properties of Ionic Compounds</h4>
                <ul>
                    <li>High melting and boiling points</li>
                    <li>Soluble in polar solvents (water)</li>
                    <li>Conduct electricity in molten or aqueous state</li>
                    <li>Hard and brittle</li>
                    <li>Form crystalline solids</li>
                </ul>
                
                <h4>Example: Formation of NaCl</h4>
                <p>Na → Na⁺ + e⁻ (loses 1 electron)</p>
                <p>Cl + e⁻ → Cl⁻ (gains 1 electron)</p>
                <p>Na⁺ + Cl⁻ → NaCl</p>
                
                <h4>B. Covalent Bond</h4>
                <p><strong>Definition:</strong> Bond formed by sharing of electrons between atoms.</p>
                
                <h4>Types of Covalent Bonds</h4>
                <ul>
                    <li><strong>Single Bond:</strong> Sharing of one pair of electrons (H-H)</li>
                    <li><strong>Double Bond:</strong> Sharing of two pairs of electrons (O=O)</li>
                    <li><strong>Triple Bond:</strong> Sharing of three pairs of electrons (N≡N)</li>
                </ul>
                
                <h4>Properties of Covalent Compounds</h4>
                <ul>
                    <li>Low melting and boiling points</li>
                    <li>Soluble in non-polar solvents</li>
                    <li>Do not conduct electricity</li>
                    <li>Exist as gases, liquids, or soft solids</li>
                </ul>
                
                <h4>C. Metallic Bond</h4>
                <p>Bond formed by delocalized electrons in metals.</p>
                <ul>
                    <li>Sea of electrons model</li>
                    <li>Good conductors of heat and electricity</li>
                    <li>Malleable and ductile</li>
                    <li>Lustrous appearance</li>
                </ul>
                
                <h3>2. Lewis Structures</h3>
                <p>Lewis structures show valence electrons as dots around atomic symbols.</p>
                
                <h4>Rules for Drawing Lewis Structures</h4>
                <ol>
                    <li>Count total valence electrons</li>
                    <li>Arrange atoms (least electronegative in center)</li>
                    <li>Connect atoms with single bonds</li>
                    <li>Complete octets of outer atoms</li>
                    <li>Place remaining electrons on central atom</li>
                    <li>Form multiple bonds if needed</li>
                </ol>
                
                <h4>Examples</h4>
                <p><strong>H₂O:</strong></p>
                <p>O has 6 valence electrons, each H has 1</p>
                <p>Total = 6 + 2(1) = 8 electrons</p>
                <p>H-O-H with 2 lone pairs on O</p>
                
                <p><strong>CO₂:</strong></p>
                <p>C has 4, each O has 6</p>
                <p>Total = 4 + 2(6) = 16 electrons</p>
                <p>O=C=O (two double bonds)</p>
                
                <h3>3. VSEPR Theory</h3>
                <p><strong>Valence Shell Electron Pair Repulsion Theory</strong></p>
                <p>Electron pairs around central atom repel each other and arrange themselves to minimize repulsion.</p>
                
                <h4>Molecular Geometries</h4>
                <table>
                    <tr>
                        <th>Electron Pairs</th>
                        <th>Geometry</th>
                        <th>Bond Angle</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Linear</td>
                        <td>180°</td>
                        <td>CO₂</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Trigonal Planar</td>
                        <td>120°</td>
                        <td>BF₃</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Tetrahedral</td>
                        <td>109.5°</td>
                        <td>CH₄</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Trigonal Bipyramidal</td>
                        <td>90°, 120°</td>
                        <td>PCl₅</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Octahedral</td>
                        <td>90°</td>
                        <td>SF₆</td>
                    </tr>
                </table>
                
                <h4>Effect of Lone Pairs</h4>
                <ul>
                    <li>Lone pairs occupy more space than bonding pairs</li>
                    <li>Repulsion order: LP-LP > LP-BP > BP-BP</li>
                    <li>Lone pairs reduce bond angles</li>
                </ul>
                
                <h4>Examples with Lone Pairs</h4>
                <ul>
                    <li><strong>H₂O:</strong> Bent shape, 104.5° (2 BP, 2 LP)</li>
                    <li><strong>NH₃:</strong> Pyramidal, 107° (3 BP, 1 LP)</li>
                    <li><strong>CH₄:</strong> Tetrahedral, 109.5° (4 BP, 0 LP)</li>
                </ul>
                
                <h3>4. Hybridization</h3>
                <p>Mixing of atomic orbitals to form new hybrid orbitals.</p>
                
                <h4>Types of Hybridization</h4>
                <table>
                    <tr>
                        <th>Hybridization</th>
                        <th>Orbitals Mixed</th>
                        <th>Geometry</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td>sp</td>
                        <td>1s + 1p</td>
                        <td>Linear</td>
                        <td>BeCl₂</td>
                    </tr>
                    <tr>
                        <td>sp²</td>
                        <td>1s + 2p</td>
                        <td>Trigonal Planar</td>
                        <td>BF₃</td>
                    </tr>
                    <tr>
                        <td>sp³</td>
                        <td>1s + 3p</td>
                        <td>Tetrahedral</td>
                        <td>CH₄</td>
                    </tr>
                    <tr>
                        <td>sp³d</td>
                        <td>1s + 3p + 1d</td>
                        <td>Trigonal Bipyramidal</td>
                        <td>PCl₅</td>
                    </tr>
                    <tr>
                        <td>sp³d²</td>
                        <td>1s + 3p + 2d</td>
                        <td>Octahedral</td>
                        <td>SF₆</td>
                    </tr>
                </table>
                
                <h3>5. Polarity of Molecules</h3>
                
                <h4>Polar Molecules</h4>
                <ul>
                    <li>Have net dipole moment</li>
                    <li>Asymmetric charge distribution</li>
                    <li>Examples: H₂O, NH₃, HCl</li>
                </ul>
                
                <h4>Non-Polar Molecules</h4>
                <ul>
                    <li>No net dipole moment</li>
                    <li>Symmetric charge distribution</li>
                    <li>Examples: CO₂, CH₄, BF₃</li>
                </ul>
                
                <h3>Practice Problems</h3>
                
                <p><strong>Problem 1:</strong> Predict the shape of NH₃.</p>
                <p><strong>Solution:</strong></p>
                <p>N has 5 valence electrons</p>
                <p>3 bonding pairs with H, 1 lone pair</p>
                <p>Total = 4 electron pairs</p>
                <p>Shape: Trigonal pyramidal</p>
                <p>Bond angle: ~107°</p>
                
                <p><strong>Problem 2:</strong> What is the hybridization of carbon in CH₄?</p>
                <p><strong>Solution:</strong></p>
                <p>4 bonding pairs, 0 lone pairs</p>
                <p>Hybridization: sp³</p>
                <p>Geometry: Tetrahedral</p>
                
                <h3>Important Points</h3>
                <ul>
                    <li>Ionic bonds form between metals and non-metals</li>
                    <li>Covalent bonds form between non-metals</li>
                    <li>Octet rule: Atoms tend to have 8 electrons in valence shell</li>
                    <li>Exceptions: H (2 electrons), Be, B (less than 8)</li>
                    <li>Bond strength: Triple > Double > Single</li>
                    <li>Electronegativity difference determines bond type</li>
                </ul>
            `
        },
        16: {
            title: "Calculus - Limits and Continuity",
            description: "Complete guide to limits, continuity, derivatives and their applications",
            class: "11",
            date: "2024-01-12",
            views: 3200,
            tags: ["calculus", "limits", "continuity", "derivatives"],
            content: `
                <h2>Limits and Continuity</h2>
                
                <h3>1. Introduction to Limits</h3>
                <p><strong>Definition:</strong> The limit of a function f(x) as x approaches a is the value that f(x) gets closer to as x gets closer to a.</p>
                
                <h4>Notation</h4>
                <p><code>lim(x→a) f(x) = L</code></p>
                <p>Read as: "The limit of f(x) as x approaches a equals L"</p>
                
                <h3>2. Properties of Limits</h3>
                <p>If lim(x→a) f(x) = L and lim(x→a) g(x) = M, then:</p>
                
                <h4>Sum Rule</h4>
                <p><code>lim(x→a) [f(x) + g(x)] = L + M</code></p>
                
                <h4>Difference Rule</h4>
                <p><code>lim(x→a) [f(x) - g(x)] = L - M</code></p>
                
                <h4>Product Rule</h4>
                <p><code>lim(x→a) [f(x) × g(x)] = L × M</code></p>
                
                <h4>Quotient Rule</h4>
                <p><code>lim(x→a) [f(x) / g(x)] = L / M</code> (if M ≠ 0)</p>
                
                <h4>Constant Multiple Rule</h4>
                <p><code>lim(x→a) [k × f(x)] = k × L</code></p>
                
                <h4>Power Rule</h4>
                <p><code>lim(x→a) [f(x)]ⁿ = Lⁿ</code></p>
                
                <h3>3. Standard Limits</h3>
                <ul>
                    <li><code>lim(x→0) (sin x)/x = 1</code></li>
                    <li><code>lim(x→0) (1 - cos x)/x = 0</code></li>
                    <li><code>lim(x→0) (tan x)/x = 1</code></li>
                    <li><code>lim(x→0) (eˣ - 1)/x = 1</code></li>
                    <li><code>lim(x→0) (aˣ - 1)/x = ln a</code></li>
                    <li><code>lim(x→0) (ln(1 + x))/x = 1</code></li>
                    <li><code>lim(x→∞) (1 + 1/x)ˣ = e</code></li>
                </ul>
                
                <h3>4. Indeterminate Forms</h3>
                <p>Forms that require special techniques to evaluate:</p>
                <ul>
                    <li>0/0</li>
                    <li>∞/∞</li>
                    <li>0 × ∞</li>
                    <li>∞ - ∞</li>
                    <li>0⁰</li>
                    <li>1^∞</li>
                    <li>∞⁰</li>
                </ul>
                
                <h3>5. L'Hôpital's Rule</h3>
                <p>For indeterminate forms 0/0 or ∞/∞:</p>
                <p><code>lim(x→a) f(x)/g(x) = lim(x→a) f'(x)/g'(x)</code></p>
                
                <h3>6. Continuity</h3>
                <p><strong>Definition:</strong> A function f(x) is continuous at x = a if:</p>
                <ol>
                    <li>f(a) is defined</li>
                    <li>lim(x→a) f(x) exists</li>
                    <li>lim(x→a) f(x) = f(a)</li>
                </ol>
                
                <h4>Types of Discontinuity</h4>
                <ul>
                    <li><strong>Removable:</strong> Can be "fixed" by redefining function at a point</li>
                    <li><strong>Jump:</strong> Left and right limits exist but are different</li>
                    <li><strong>Infinite:</strong> Function approaches ±∞</li>
                </ul>
                
                <h3>7. Properties of Continuous Functions</h3>
                <ul>
                    <li>Sum of continuous functions is continuous</li>
                    <li>Product of continuous functions is continuous</li>
                    <li>Quotient of continuous functions is continuous (where denominator ≠ 0)</li>
                    <li>Composition of continuous functions is continuous</li>
                </ul>
                
                <h3>8. Intermediate Value Theorem</h3>
                <p>If f is continuous on [a, b] and k is between f(a) and f(b), then there exists c in (a, b) such that f(c) = k.</p>
                
                <h3>Practice Problems</h3>
                
                <p><strong>Problem 1:</strong> Evaluate lim(x→2) (x² - 4)/(x - 2)</p>
                <p><strong>Solution:</strong></p>
                <p>Direct substitution gives 0/0 (indeterminate)</p>
                <p>Factor: (x² - 4)/(x - 2) = (x + 2)(x - 2)/(x - 2)</p>
                <p>Cancel: x + 2</p>
                <p>lim(x→2) (x + 2) = 2 + 2 = 4</p>
                
                <p><strong>Problem 2:</strong> Evaluate lim(x→0) (sin 3x)/x</p>
                <p><strong>Solution:</strong></p>
                <p>Multiply and divide by 3:</p>
                <p>lim(x→0) 3 × (sin 3x)/(3x)</p>
                <p>= 3 × lim(x→0) (sin 3x)/(3x)</p>
                <p>= 3 × 1 = 3</p>
                
                <p><strong>Problem 3:</strong> Check if f(x) = (x² - 1)/(x - 1) is continuous at x = 1</p>
                <p><strong>Solution:</strong></p>
                <p>f(1) is not defined (0/0)</p>
                <p>But lim(x→1) (x² - 1)/(x - 1) = lim(x→1) (x + 1) = 2</p>
                <p>Function has removable discontinuity at x = 1</p>
                <p>Can be made continuous by defining f(1) = 2</p>
                
                <p><strong>Problem 4:</strong> Evaluate lim(x→∞) (3x² + 2x)/(2x² - x)</p>
                <p><strong>Solution:</strong></p>
                <p>Divide numerator and denominator by x²:</p>
                <p>lim(x→∞) (3 + 2/x)/(2 - 1/x)</p>
                <p>As x→∞, 2/x→0 and 1/x→0</p>
                <p>= 3/2</p>
                
                <h3>Important Techniques</h3>
                <ul>
                    <li><strong>Direct Substitution:</strong> Try first if not indeterminate</li>
                    <li><strong>Factoring:</strong> For polynomial expressions</li>
                    <li><strong>Rationalization:</strong> For expressions with radicals</li>
                    <li><strong>Standard Limits:</strong> Use known limit formulas</li>
                    <li><strong>L'Hôpital's Rule:</strong> For 0/0 or ∞/∞ forms</li>
                    <li><strong>Squeeze Theorem:</strong> When function is bounded</li>
                </ul>
                
                <h3>Key Formulas Summary</h3>
                <ul>
                    <li>lim(x→0) (sin x)/x = 1</li>
                    <li>lim(x→0) (1 - cos x)/x² = 1/2</li>
                    <li>lim(x→0) (eˣ - 1)/x = 1</li>
                    <li>lim(x→∞) (1 + 1/x)ˣ = e</li>
                    <li>lim(x→a) f(x)/g(x) = lim(x→a) f'(x)/g'(x) (L'Hôpital)</li>
                </ul>
            `
        },
        37: {
            title: "Microeconomics - Demand and Supply",
            description: "Law of demand, supply, market equilibrium, elasticity and consumer behavior",
            class: "11",
            date: "2024-01-17",
            views: 2320,
            tags: ["microeconomics", "demand", "supply", "equilibrium"],
            content: `
                <h2>Demand and Supply</h2>
                
                <h3>1. Demand</h3>
                <p><strong>Definition:</strong> Demand is the quantity of a good or service that consumers are willing and able to purchase at various prices during a given period.</p>
                
                <h4>Law of Demand</h4>
                <p><strong>Statement:</strong> Other things remaining constant, as the price of a good increases, the quantity demanded decreases, and vice versa.</p>
                
                <h4>Demand Schedule</h4>
                <table>
                    <tr>
                        <th>Price (Rs.)</th>
                        <th>Quantity Demanded</th>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>30</td>
                        <td>60</td>
                    </tr>
                    <tr>
                        <td>40</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>50</td>
                        <td>20</td>
                    </tr>
                </table>
                
                <h4>Demand Curve</h4>
                <p>Graphical representation of demand schedule. It slopes downward from left to right showing inverse relationship between price and quantity demanded.</p>
                
                <h4>Determinants of Demand</h4>
                <ul>
                    <li><strong>Price of the good:</strong> Main determinant</li>
                    <li><strong>Income:</strong> Higher income → higher demand (normal goods)</li>
                    <li><strong>Price of related goods:</strong>
                        <ul>
                            <li>Substitutes: Tea and coffee</li>
                            <li>Complements: Car and petrol</li>
                        </ul>
                    </li>
                    <li><strong>Tastes and preferences:</strong> Fashion, trends</li>
                    <li><strong>Population:</strong> More people → more demand</li>
                    <li><strong>Expectations:</strong> Future price expectations</li>
                </ul>
                
                <h4>Movement vs Shift in Demand</h4>
                <p><strong>Movement along demand curve:</strong> Due to change in price of the good itself</p>
                <p><strong>Shift in demand curve:</strong> Due to change in other factors</p>
                <ul>
                    <li>Rightward shift: Increase in demand</li>
                    <li>Leftward shift: Decrease in demand</li>
                </ul>
                
                <h3>2. Supply</h3>
                <p><strong>Definition:</strong> Supply is the quantity of a good or service that producers are willing and able to offer for sale at various prices during a given period.</p>
                
                <h4>Law of Supply</h4>
                <p><strong>Statement:</strong> Other things remaining constant, as the price of a good increases, the quantity supplied increases, and vice versa.</p>
                
                <h4>Supply Schedule</h4>
                <table>
                    <tr>
                        <th>Price (Rs.)</th>
                        <th>Quantity Supplied</th>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>30</td>
                        <td>60</td>
                    </tr>
                    <tr>
                        <td>40</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>50</td>
                        <td>100</td>
                    </tr>
                </table>
                
                <h4>Supply Curve</h4>
                <p>Graphical representation of supply schedule. It slopes upward from left to right showing direct relationship between price and quantity supplied.</p>
                
                <h4>Determinants of Supply</h4>
                <ul>
                    <li><strong>Price of the good:</strong> Main determinant</li>
                    <li><strong>Cost of production:</strong> Higher cost → lower supply</li>
                    <li><strong>Technology:</strong> Better technology → higher supply</li>
                    <li><strong>Price of related goods:</strong> Alternative products</li>
                    <li><strong>Number of sellers:</strong> More sellers → more supply</li>
                    <li><strong>Expectations:</strong> Future price expectations</li>
                    <li><strong>Government policies:</strong> Taxes, subsidies</li>
                </ul>
                
                <h3>3. Market Equilibrium</h3>
                <p><strong>Definition:</strong> Point where quantity demanded equals quantity supplied.</p>
                
                <h4>Equilibrium Price and Quantity</h4>
                <p>At equilibrium:</p>
                <ul>
                    <li>Quantity Demanded = Quantity Supplied</li>
                    <li>No shortage or surplus</li>
                    <li>Market clears</li>
                </ul>
                
                <h4>Example</h4>
                <table>
                    <tr>
                        <th>Price</th>
                        <th>Qd</th>
                        <th>Qs</th>
                        <th>Situation</th>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>100</td>
                        <td>20</td>
                        <td>Shortage (80)</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td>80</td>
                        <td>40</td>
                        <td>Shortage (40)</td>
                    </tr>
                    <tr>
                        <td>30</td>
                        <td>60</td>
                        <td>60</td>
                        <td><strong>Equilibrium</strong></td>
                    </tr>
                    <tr>
                        <td>40</td>
                        <td>40</td>
                        <td>80</td>
                        <td>Surplus (40)</td>
                    </tr>
                    <tr>
                        <td>50</td>
                        <td>20</td>
                        <td>100</td>
                        <td>Surplus (80)</td>
                    </tr>
                </table>
                
                <p>Equilibrium Price = Rs. 30</p>
                <p>Equilibrium Quantity = 60 units</p>
                
                <h4>Changes in Equilibrium</h4>
                <ul>
                    <li><strong>Increase in demand:</strong> Price ↑, Quantity ↑</li>
                    <li><strong>Decrease in demand:</strong> Price ↓, Quantity ↓</li>
                    <li><strong>Increase in supply:</strong> Price ↓, Quantity ↑</li>
                    <li><strong>Decrease in supply:</strong> Price ↑, Quantity ↓</li>
                </ul>
                
                <h3>4. Elasticity of Demand</h3>
                <p><strong>Definition:</strong> Measure of responsiveness of quantity demanded to changes in price.</p>
                
                <h4>Price Elasticity of Demand (PED)</h4>
                <p><code>PED = (% change in Qd) / (% change in Price)</code></p>
                
                <h4>Types of Elasticity</h4>
                <ul>
                    <li><strong>Perfectly Elastic (Ed = ∞):</strong> Horizontal demand curve</li>
                    <li><strong>Elastic (Ed > 1):</strong> % change in Qd > % change in P</li>
                    <li><strong>Unit Elastic (Ed = 1):</strong> % change in Qd = % change in P</li>
                    <li><strong>Inelastic (Ed < 1):</strong> % change in Qd < % change in P</li>
                    <li><strong>Perfectly Inelastic (Ed = 0):</strong> Vertical demand curve</li>
                </ul>
                
                <h4>Factors Affecting Elasticity</h4>
                <ul>
                    <li><strong>Availability of substitutes:</strong> More substitutes → more elastic</li>
                    <li><strong>Necessity vs luxury:</strong> Necessities → inelastic</li>
                    <li><strong>Proportion of income:</strong> Higher proportion → more elastic</li>
                    <li><strong>Time period:</strong> Longer time → more elastic</li>
                    <li><strong>Nature of good:</strong> Addictive goods → inelastic</li>
                </ul>
                
                <h3>5. Consumer Behavior</h3>
                
                <h4>Utility</h4>
                <p><strong>Total Utility (TU):</strong> Total satisfaction from consuming all units</p>
                <p><strong>Marginal Utility (MU):</strong> Additional satisfaction from consuming one more unit</p>
                
                <h4>Law of Diminishing Marginal Utility</h4>
                <p>As consumption increases, marginal utility decreases.</p>
                
                <h4>Example</h4>
                <table>
                    <tr>
                        <th>Units</th>
                        <th>Total Utility</th>
                        <th>Marginal Utility</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>18</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>24</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>28</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>30</td>
                        <td>2</td>
                    </tr>
                </table>
                
                <h3>Practice Problems</h3>
                
                <p><strong>Problem 1:</strong> If price increases from Rs. 10 to Rs. 12 and quantity demanded decreases from 100 to 80 units, calculate price elasticity of demand.</p>
                <p><strong>Solution:</strong></p>
                <p>% change in Qd = [(80-100)/100] × 100 = -20%</p>
                <p>% change in P = [(12-10)/10] × 100 = 20%</p>
                <p>PED = -20% / 20% = -1 (Unit elastic)</p>
                
                <p><strong>Problem 2:</strong> At price Rs. 20, Qd = 50 and Qs = 30. At price Rs. 30, Qd = 40 and Qs = 40. Find equilibrium.</p>
                <p><strong>Solution:</strong></p>
                <p>At Rs. 30, Qd = Qs = 40</p>
                <p>Equilibrium Price = Rs. 30</p>
                <p>Equilibrium Quantity = 40 units</p>
                
                <h3>Important Points</h3>
                <ul>
                    <li>Demand curve slopes downward (inverse relationship)</li>
                    <li>Supply curve slopes upward (direct relationship)</li>
                    <li>Equilibrium occurs where demand = supply</li>
                    <li>Shortage → price rises</li>
                    <li>Surplus → price falls</li>
                    <li>Elastic demand → small price change causes large quantity change</li>
                    <li>Inelastic demand → large price change causes small quantity change</li>
                </ul>
                
                <h3>Key Formulas</h3>
                <ul>
                    <li>PED = (% Δ in Qd) / (% Δ in P)</li>
                    <li>MU = ΔTU / ΔQ</li>
                    <li>% change = [(New - Old) / Old] × 100</li>
                </ul>
            `
        },
    // Add more detailed notes as needed...
};

// Get note ID from URL
const urlParams = new URLSearchParams(window.location.search);
const noteId = parseInt(urlParams.get('id'));
const subject = urlParams.get('subject');
const classLevel = urlParams.get('class');

// Class names mapping
const classNames = {
    '11': 'Class 11',
    '12': 'Class 12',
    'bachelor': "Bachelor's Level",
    'master': "Master's Level"
};

// Load note details
function loadNoteDetail() {
    const note = noteDetailsDatabase[noteId];
    
    if (!note) {
        document.getElementById('noteTitle').textContent = 'Note Not Found';
        document.getElementById('noteContent').innerHTML = '<p>Sorry, this note could not be found. <a href="index.html">Go back to home</a></p>';
        return;
    }

    // Update page content
    document.getElementById('noteTitle').textContent = note.title;
    document.getElementById('noteClass').textContent = `📚 ${classNames[note.class]}`;
    document.getElementById('noteDate').textContent = `📅 ${formatDate(note.date)}`;
    document.getElementById('noteViews').textContent = `👁️ ${note.views} views`;
    document.getElementById('noteCategory').textContent = `📂 ${note.category}`;
    document.getElementById('noteContent').innerHTML = note.content;
    
    // Update breadcrumb
    document.getElementById('breadcrumbClass').textContent = classNames[note.class];
    document.getElementById('breadcrumbClass').href = `class.html?class=${note.class}`;
    document.getElementById('breadcrumbSubject').textContent = note.category;
    document.getElementById('breadcrumbSubject').href = `notes.html?subject=${note.subject}&class=${note.class}`;
    document.getElementById('breadcrumbNote').textContent = note.title;
    
    // Load tags
    const tagsContainer = document.getElementById('noteTags');
    tagsContainer.innerHTML = note.tags.map(tag => 
        `<span class="tag">#${tag}</span>`
    ).join('');
    
    // Update page title
    document.title = `${note.title} - Gyanu Note`;
    
    // Load related notes
    loadRelatedNotes(note.subject, note.class, noteId);
    
    // Increment view count
    note.views++;
    document.getElementById('noteViews').textContent = `👁️ ${note.views} views`;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load related notes from same class and subject
function loadRelatedNotes(subject, classLevel, currentNoteId) {
    const relatedContainer = document.getElementById('relatedNotes');
    
    // Get notes from same subject and class
    const related = Object.entries(noteDetailsDatabase)
        .filter(([id, note]) => 
            note.subject === subject && 
            note.class === classLevel && 
            parseInt(id) !== currentNoteId
        )
        .slice(0, 3)
        .map(([id, note]) => ({ id, ...note }));
    
    if (related.length === 0) {
        relatedContainer.innerHTML = '<p style="color: #64748b;">No related notes found.</p>';
        return;
    }
    
    relatedContainer.innerHTML = related.map(note => `
        <div class="note-card">
            <div class="note-card-header">
                <h3>${note.title}</h3>
            </div>
            <div class="note-card-body">
                <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">
                    ${note.description || note.title}
                </p>
                <a href="note-detail.html?id=${note.id}&subject=${subject}&class=${classLevel}" class="btn">Read More</a>
            </div>
        </div>
    `).join('');
}

// Download PDF functionality
document.getElementById('downloadBtn').addEventListener('click', () => {
    alert('PDF download functionality: You can integrate libraries like jsPDF or html2pdf.js to generate PDFs from the note content.');
});

// Share functionality
document.getElementById('shareBtn').addEventListener('click', () => {
    const title = document.getElementById('noteTitle').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this note: ${title}`,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
});

// Bookmark functionality
document.getElementById('bookmarkBtn').addEventListener('click', function() {
    const noteId = urlParams.get('id');
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarks.includes(noteId)) {
        bookmarks = bookmarks.filter(id => id !== noteId);
        this.textContent = '⭐ Bookmark';
        alert('Removed from bookmarks');
    } else {
        bookmarks.push(noteId);
        this.textContent = '⭐ Bookmarked';
        alert('Added to bookmarks');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
});

// Check if already bookmarked
function checkBookmark() {
    const noteId = urlParams.get('id');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    if (bookmarks.includes(noteId)) {
        document.getElementById('bookmarkBtn').textContent = '⭐ Bookmarked';
    }
}

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNoteDetail();
    checkBookmark();
});
// PDF Download using html2pdf.js
document.getElementById('downloadBtn').addEventListener('click', function() {
    const noteTitle = document.getElementById('noteTitle').textContent;
    const noteContent = document.getElementById('noteContent');

    // Show loading
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    this.disabled = true;

    // Create a clean version for PDF
    const printContent = document.createElement('div');
    printContent.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">${noteTitle}</h1>
            <div style="border-top: 3px solid #2563eb; padding-top: 20px;">
                ${noteContent.innerHTML}
            </div>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; color: #666;">
                <p>Downloaded from Gyanu Note - www.gyanunote.com</p>
            </div>
        </div>
    `;

    // PDF options
    const opt = {
        margin: 10,
        filename: `${noteTitle.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(printContent).save().then(() => {
        this.innerHTML = '<i class="fas fa-download"></i> Download PDF';
        this.disabled = false;
    });
});
