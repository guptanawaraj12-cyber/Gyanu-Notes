// ==================== COMPLETE NOTES DATABASE ====================
// Easy to add more notes - just copy the structure and modify content

const notesDatabase = {
    
    // ==================== PHYSICS NOTES ====================
    physics: [
        {
            id: 1,
            title: "Mechanics - Motion in a Straight Line",
            description: "Complete notes on kinematics, equations of motion, velocity, acceleration and graphs",
            class: "11",
            date: "2024-01-15",
            views: 2450,
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
            `
        },
        {
            id: 2,
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
                
                <h3>3. Newton's Third Law (Action-Reaction Law)</h3>
                <p><strong>Statement:</strong> For every action, there is an equal and opposite reaction.</p>
                
                <h4>Examples</h4>
                <ul>
                    <li>Walking: We push ground backward, ground pushes us forward</li>
                    <li>Swimming: We push water backward, water pushes us forward</li>
                    <li>Rocket propulsion: Gases expelled downward, rocket moves upward</li>
                    <li>Recoil of gun: Bullet moves forward, gun moves backward</li>
                </ul>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> A force of 50 N acts on a mass of 10 kg. Find acceleration.</p>
                <p><strong>Solution:</strong></p>
                <p>F = ma</p>
                <p>50 = 10 × a</p>
                <p>a = 5 m/s²</p>
                
                <p><strong>Problem 2:</strong> A 1000 kg car accelerates from 0 to 20 m/s in 10 seconds. Find the force.</p>
                <p><strong>Solution:</strong></p>
                <p>a = (v - u) / t = (20 - 0) / 10 = 2 m/s²</p>
                <p>F = ma = 1000 × 2 = 2000 N</p>
            `
        },
        {
            id: 3,
            title: "Work, Energy and Power",
            description: "Work done by force, kinetic and potential energy, conservation of energy, power",
            class: "11",
            date: "2024-02-01",
            views: 1890,
            tags: ["work", "energy", "power", "conservation"],
            content: `
                <h2>Work, Energy and Power</h2>
                
                <h3>1. Work</h3>
                <p><strong>Definition:</strong> Work is said to be done when a force acts on an object and the object moves in the direction of force.</p>
                
                <h4>Formula</h4>
                <p><code>W = F × s × cos θ</code></p>
                <p>Where: W = Work, F = Force, s = displacement, θ = angle between F and s</p>
                
                <h4>Unit of Work</h4>
                <p>SI Unit: Joule (J)</p>
                <p>1 Joule = 1 Newton × 1 meter</p>
                
                <h3>2. Energy</h3>
                <p><strong>Definition:</strong> Energy is the capacity to do work.</p>
                
                <h4>Kinetic Energy (KE)</h4>
                <p>Energy possessed by a body due to its motion.</p>
                <p><strong>Formula:</strong> <code>KE = ½mv²</code></p>
                
                <h4>Potential Energy (PE)</h4>
                <p>Energy possessed by a body due to its position.</p>
                <p><strong>Formula:</strong> <code>PE = mgh</code></p>
                
                <h3>3. Conservation of Energy</h3>
                <p><strong>Law:</strong> Energy can neither be created nor destroyed; it can only be transformed from one form to another.</p>
                
                <h3>4. Power</h3>
                <p><strong>Definition:</strong> Power is the rate of doing work.</p>
                <p><strong>Formula:</strong> <code>P = W / t</code></p>
                <p>Unit: Watt (W)</p>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> A 2 kg object moves with velocity 10 m/s. Find its kinetic energy.</p>
                <p><strong>Solution:</strong></p>
                <p>KE = ½mv² = ½ × 2 × (10)² = 100 J</p>
            `
        },
        {
            id: 4,
            title: "Electricity and Magnetism",
            description: "Electric field, magnetic field, electromagnetic induction, and applications",
            class: "12",
            date: "2024-02-05",
            views: 1650,
            tags: ["electricity", "magnetism", "induction", "field"],
            content: `
                <h2>Electricity and Magnetism</h2>
                
                <h3>1. Electric Charge</h3>
                <p>Electric charge is a fundamental property of matter that causes it to experience a force in an electromagnetic field.</p>
                
                <h4>Properties of Charge</h4>
                <ul>
                    <li>Like charges repel, unlike charges attract</li>
                    <li>Charge is quantized: q = ne</li>
                    <li>Charge is conserved</li>
                </ul>
                
                <h3>2. Coulomb's Law</h3>
                <p><strong>Formula:</strong> <code>F = k(q₁q₂)/r²</code></p>
                <p>Where: k = 9 × 10⁹ Nm²/C²</p>
                
                <h3>3. Electric Field</h3>
                <p><strong>Definition:</strong> Electric field is the region around a charge where another charge experiences a force.</p>
                <p><strong>Formula:</strong> <code>E = F/q = kQ/r²</code></p>
                
                <h3>4. Ohm's Law</h3>
                <p><code>V = IR</code></p>
                <p>Where: V = voltage, I = current, R = resistance</p>
                
                <h3>5. Magnetic Field</h3>
                <p>Region around a magnet where magnetic force is experienced.</p>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> A conductor has resistance 10 Ω. If 2 A current flows, find voltage.</p>
                <p><strong>Solution:</strong></p>
                <p>V = IR = 2 × 10 = 20 V</p>
            `
        },
        {
            id: 5,
            title: "Thermodynamics - Laws and Applications",
            description: "First, second, and third laws of thermodynamics with applications",
            class: "11",
            date: "2024-02-15",
            views: 1420,
            tags: ["thermodynamics", "heat", "energy", "laws"],
            content: `
                <h2>Thermodynamics</h2>
                
                <h3>1. Introduction</h3>
                <p>Thermodynamics is the study of heat, work, and energy transformations.</p>
                
                <h3>2. First Law of Thermodynamics</h3>
                <p><strong>Statement:</strong> Energy can neither be created nor destroyed, only transformed.</p>
                <p><strong>Formula:</strong> <code>ΔU = Q - W</code></p>
                <p>Where: ΔU = change in internal energy, Q = heat added, W = work done</p>
                
                <h3>3. Second Law of Thermodynamics</h3>
                <p>Heat cannot spontaneously flow from a colder body to a hotter body.</p>
                
                <h3>4. Heat Transfer</h3>
                <ul>
                    <li><strong>Conduction:</strong> Transfer through direct contact</li>
                    <li><strong>Convection:</strong> Transfer through fluid movement</li>
                    <li><strong>Radiation:</strong> Transfer through electromagnetic waves</li>
                </ul>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> A system absorbs 500 J of heat and does 200 J of work. Find change in internal energy.</p>
                <p><strong>Solution:</strong></p>
                <p>ΔU = Q - W = 500 - 200 = 300 J</p>
            `
        }
    ],

    // ==================== CHEMISTRY NOTES ====================
    chemistry: [
        {
            id: 6,
            title: "Organic Chemistry - Hydrocarbons",
            description: "Alkanes, alkenes, alkynes - nomenclature, properties, and reactions",
            class: "12",
            date: "2024-01-18",
            views: 2200,
            tags: ["organic", "hydrocarbons", "alkanes", "alkenes"],
            content: `
                <h2>Hydrocarbons</h2>
                <p>Hydrocarbons are organic compounds containing only carbon and hydrogen atoms.</p>
                
                <h3>1. Classification</h3>
                <h4>Saturated Hydrocarbons (Alkanes)</h4>
                <p>General Formula: C<sub>n</sub>H<sub>2n+2</sub></p>
                
                <h4>Unsaturated Hydrocarbons</h4>
                <ul>
                    <li><strong>Alkenes:</strong> C<sub>n</sub>H<sub>2n</sub></li>
                    <li><strong>Alkynes:</strong> C<sub>n</sub>H<sub>2n-2</sub></li>
                </ul>
                
                <h3>2. Alkanes</h3>
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
                </table>
                
                <h3>3. Reactions</h3>
                <h4>Combustion</h4>
                <p>CH₄ + 2O₂ → CO₂ + 2H₂O + Heat</p>
                
                <h4>Halogenation</h4>
                <p>CH₄ + Cl₂ → CH₃Cl + HCl</p>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> Write molecular formula of alkane with 8 carbon atoms.</p>
                <p><strong>Solution:</strong></p>
                <p>Using C<sub>n</sub>H<sub>2n+2</sub></p>
                <p>C₈H₁₈</p>
            `
        },
        {
            id: 7,
            title: "Chemical Bonding",
            description: "Ionic, covalent, and metallic bonds with examples",
            class: "11",
            date: "2024-01-25",
            views: 1980,
            tags: ["bonding", "ionic", "covalent", "metallic"],
            content: `
                <h2>Chemical Bonding</h2>
                
                <h3>1. Types of Bonds</h3>
                
                <h4>Ionic Bond</h4>
                <p>Bond formed by complete transfer of electrons.</p>
                <p>Example: NaCl</p>
                
                <h4>Covalent Bond</h4>
                <p>Bond formed by sharing of electrons.</p>
                <p>Example: H₂, O₂, N₂</p>
                
                <h4>Metallic Bond</h4>
                <p>Bond formed by delocalized electrons in metals.</p>
                
                <h3>2. Lewis Structures</h3>
                <p>Show valence electrons as dots around atomic symbols.</p>
                
                <h3>3. VSEPR Theory</h3>
                <p>Electron pairs repel each other and arrange to minimize repulsion.</p>
                
                <table>
                    <tr>
                        <th>Electron Pairs</th>
                        <th>Geometry</th>
                        <th>Example</th>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Linear</td>
                        <td>CO₂</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Trigonal Planar</td>
                        <td>BF₃</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Tetrahedral</td>
                        <td>CH₄</td>
                    </tr>
                </table>
            `
        },
        {
            id: 8,
            title: "Periodic Table and Trends",
            description: "Periodic properties, trends, and element classification",
            class: "11",
            date: "2024-02-05",
            views: 2350,
            tags: ["periodic table", "trends", "elements"],
            content: `
                <h2>Periodic Table</h2>
                
                <h3>1. Organization</h3>
                <p>Elements arranged by increasing atomic number.</p>
                
                <h3>2. Periodic Trends</h3>
                
                <h4>Atomic Radius</h4>
                <ul>
                    <li>Decreases across period (left to right)</li>
                    <li>Increases down group (top to bottom)</li>
                </ul>
                
                <h4>Ionization Energy</h4>
                <ul>
                    <li>Increases across period</li>
                    <li>Decreases down group</li>
                </ul>
                
                <h4>Electronegativity</h4>
                <ul>
                    <li>Increases across period</li>
                    <li>Decreases down group</li>
                </ul>
                
                <h3>3. Groups</h3>
                <ul>
                    <li>Group 1: Alkali Metals</li>
                    <li>Group 2: Alkaline Earth Metals</li>
                    <li>Group 17: Halogens</li>
                    <li>Group 18: Noble Gases</li>
                </ul>
            `
        }
    ],

    // ==================== BIOLOGY NOTES ====================
    biology: [
        {
            id: 11,
            title: "Cell Biology - Structure and Function",
            description: "Cell organelles, membrane structure, and cell division",
            class: "11",
            date: "2024-01-22",
            views: 2100,
            tags: ["cell", "organelles", "mitosis"],
            content: `
                <h2>Cell Biology</h2>
                
                <h3>1. Cell Theory</h3>
                <ul>
                    <li>All living organisms are made of cells</li>
                    <li>Cell is the basic unit of life</li>
                    <li>All cells arise from pre-existing cells</li>
                </ul>
                
                <h3>2. Cell Organelles</h3>
                
                <h4>Nucleus</h4>
                <p>Control center of the cell, contains DNA.</p>
                
                <h4>Mitochondria</h4>
                <p>Powerhouse of the cell, produces ATP.</p>
                
                <h4>Ribosomes</h4>
                <p>Protein synthesis.</p>
                
                <h4>Endoplasmic Reticulum</h4>
                <ul>
                    <li><strong>Rough ER:</strong> Protein synthesis</li>
                    <li><strong>Smooth ER:</strong> Lipid synthesis</li>
                </ul>
                
                <h4>Golgi Apparatus</h4>
                <p>Packaging and modification of proteins.</p>
                
                <h3>3. Cell Division</h3>
                
                <h4>Mitosis</h4>
                <p>Produces two identical daughter cells.</p>
                <p>Phases: Prophase, Metaphase, Anaphase, Telophase</p>
                
                <h4>Meiosis</h4>
                <p>Produces four non-identical gametes.</p>
                <p>Two divisions: Meiosis I and Meiosis II</p>
            `
        },
        {
            id: 12,
            title: "Genetics and Heredity",
            description: "Mendelian genetics, DNA structure, and inheritance patterns",
            class: "12",
            date: "2024-02-08",
            views: 1890,
            tags: ["genetics", "DNA", "heredity"],
            content: `
                <h2>Genetics</h2>
                
                <h3>1. Mendel's Laws</h3>
                
                <h4>Law of Segregation</h4>
                <p>Each parent contributes one allele for each trait.</p>
                
                <h4>Law of Independent Assortment</h4>
                <p>Genes for different traits are inherited independently.</p>
                
                <h3>2. DNA Structure</h3>
                <p>Double helix structure discovered by Watson and Crick.</p>
                <ul>
                    <li>Made of nucleotides</li>
                    <li>Base pairs: A-T, G-C</li>
                    <li>Sugar-phosphate backbone</li>
                </ul>
                
                <h3>3. Inheritance Patterns</h3>
                <ul>
                    <li><strong>Dominant:</strong> Expressed when present</li>
                    <li><strong>Recessive:</strong> Expressed only when homozygous</li>
                    <li><strong>Codominance:</strong> Both alleles expressed</li>
                </ul>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> Cross between Tt × Tt. Find offspring ratio.</p>
                <p><strong>Solution:</strong></p>
                <p>TT : Tt : tt = 1 : 2 : 1</p>
                <p>Phenotype ratio = 3 : 1 (Tall : Short)</p>
            `
        }
    ],

    // ==================== MATHEMATICS NOTES ====================
    mathematics: [
        {
            id: 16,
            title: "Calculus - Limits and Continuity",
            description: "Complete guide to limits, continuity, and derivatives",
            class: "11",
            date: "2024-01-12",
            views: 3200,
            tags: ["calculus", "limits", "continuity", "derivatives"],
            content: `
                <h2>Limits and Continuity</h2>
                
                <h3>1. Introduction to Limits</h3>
                <p><strong>Definition:</strong> The limit of a function f(x) as x approaches a is the value that f(x) gets closer to.</p>
                
                <h4>Notation</h4>
                <p><code>lim(x→a) f(x) = L</code></p>
                
                <h3>2. Properties of Limits</h3>
                <h4>Sum Rule</h4>
                <p><code>lim(x→a) [f(x) + g(x)] = L + M</code></p>
                
                <h4>Product Rule</h4>
                <p><code>lim(x→a) [f(x) × g(x)] = L × M</code></p>
                
                <h4>Quotient Rule</h4>
                <p><code>lim(x→a) [f(x) / g(x)] = L / M</code> (if M ≠ 0)</p>
                
                <h3>3. Standard Limits</h3>
                <ul>
                    <li><code>lim(x→0) (sin x)/x = 1</code></li>
                    <li><code>lim(x→0) (1 - cos x)/x = 0</code></li>
                    <li><code>lim(x→0) (eˣ - 1)/x = 1</code></li>
                    <li><code>lim(x→∞) (1 + 1/x)ˣ = e</code></li>
                </ul>
                
                <h3>4. Continuity</h3>
                <p>A function f(x) is continuous at x = a if:</p>
                <ol>
                    <li>f(a) is defined</li>
                    <li>lim(x→a) f(x) exists</li>
                    <li>lim(x→a) f(x) = f(a)</li>
                </ol>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> Evaluate lim(x→2) (x² - 4)/(x - 2)</p>
                <p><strong>Solution:</strong></p>
                <p>Factor: (x + 2)(x - 2)/(x - 2)</p>
                <p>Cancel: x + 2</p>
                <p>lim(x→2) (x + 2) = 4</p>
            `
        },
        {
            id: 17,
            title: "Trigonometry - Functions and Identities",
            description: "All trigonometric functions, identities, and equations",
            class: "11",
            date: "2024-01-28",
            views: 2850,
            tags: ["trigonometry", "functions", "identities"],
            content: `
                <h2>Trigonometry</h2>
                
                <h3>1. Trigonometric Ratios</h3>
                <ul>
                    <li>sin θ = Opposite / Hypotenuse</li>
                    <li>cos θ = Adjacent / Hypotenuse</li>
                    <li>tan θ = Opposite / Adjacent</li>
                    <li>cot θ = 1 / tan θ</li>
                    <li>sec θ = 1 / cos θ</li>
                    <li>cosec θ = 1 / sin θ</li>
                </ul>
                
                <h3>2. Fundamental Identities</h3>
                <ul>
                    <li>sin²θ + cos²θ = 1</li>
                    <li>1 + tan²θ = sec²θ</li>
                    <li>1 + cot²θ = cosec²θ</li>
                </ul>
                
                <h3>3. Angle Sum Formulas</h3>
                <ul>
                    <li>sin(A + B) = sin A cos B + cos A sin B</li>
                    <li>cos(A + B) = cos A cos B - sin A sin B</li>
                    <li>tan(A + B) = (tan A + tan B) / (1 - tan A tan B)</li>
                </ul>
                
                <h3>4. Double Angle Formulas</h3>
                <ul>
                    <li>sin 2θ = 2 sin θ cos θ</li>
                    <li>cos 2θ = cos²θ - sin²θ</li>
                    <li>tan 2θ = 2 tan θ / (1 - tan²θ)</li>
                </ul>
            `
        },
        {
            id: 18,
            title: "Vectors and 3D Geometry",
            description: "Vector operations, dot product, cross product, and 3D geometry",
            class: "12",
            date: "2024-02-06",
            views: 2450,
            tags: ["vectors", "3d geometry", "operations"],
            content: `
                <h2>Vectors</h2>
                
                <h3>1. Vector Basics</h3>
                <p>A vector has both magnitude and direction.</p>
                <p>Notation: <code>→a</code> or <strong>a</strong></p>
                
                <h3>2. Vector Operations</h3>
                
                <h4>Addition</h4>
                <p>→a + →b = (a₁ + b₁)î + (a₂ + b₂)ĵ + (a₃ + b₃)k̂</p>
                
                <h4>Scalar Multiplication</h4>
                <p>k→a = ka₁î + ka₂ĵ + ka₃k̂</p>
                
                <h3>3. Dot Product</h3>
                <p>→a · →b = |→a| |→b| cos θ</p>
                <p>→a · →b = a₁b₁ + a₂b₂ + a₃b₃</p>
                
                <h3>4. Cross Product</h3>
                <p>→a × →b = |→a| |→b| sin θ n̂</p>
                <p>Magnitude gives area of parallelogram</p>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> Find →a · →b if →a = 2î + 3ĵ and →b = 4î + 5ĵ</p>
                <p><strong>Solution:</strong></p>
                <p>→a · →b = (2)(4) + (3)(5) = 8 + 15 = 23</p>
            `
        }
    ],

    // ==================== COMPUTER SCIENCE NOTES ====================
    computer: [
        {
            id: 21,
            title: "Data Structures and Algorithms",
            description: "Arrays, linked lists, stacks, queues, trees, and sorting algorithms",
            class: "bachelor",
            date: "2024-01-10",
            views: 3500,
            tags: ["dsa", "algorithms", "data structures"],
            content: `
                <h2>Data Structures and Algorithms</h2>
                
                <h3>1. Arrays</h3>
                <p>Collection of elements stored in contiguous memory.</p>
                
                <h4>Operations</h4>
                <ul>
                    <li>Access: O(1)</li>
                    <li>Search: O(n)</li>
                    <li>Insertion: O(n)</li>
                    <li>Deletion: O(n)</li>
                </ul>
                
                <h3>2. Linked Lists</h3>
                <p>Linear data structure with nodes pointing to next node.</p>
                
                <h4>Types</h4>
                <ul>
                    <li>Singly Linked List</li>
                    <li>Doubly Linked List</li>
                    <li>Circular Linked List</li>
                </ul>
                
                <h3>3. Stacks</h3>
                <p>LIFO (Last In First Out) structure.</p>
                
                <h4>Operations</h4>
                <ul>
                    <li>Push: O(1)</li>
                    <li>Pop: O(1)</li>
                    <li>Peek: O(1)</li>
                </ul>
                
                <h3>4. Queues</h3>
                <p>FIFO (First In First Out) structure.</p>
                
                <h4>Operations</h4>
                <ul>
                    <li>Enqueue: O(1)</li>
                    <li>Dequeue: O(1)</li>
                </ul>
                
                <h3>5. Sorting Algorithms</h3>
                
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
            `
        },
        {
            id: 22,
            title: "Object-Oriented Programming in C++",
            description: "Classes, objects, inheritance, polymorphism, and encapsulation",
            class: "11",
            date: "2024-01-24",
            views: 2980,
            tags: ["oop", "cpp", "programming"],
            content: `
                <h2>Object-Oriented Programming</h2>
                
                <h3>1. Classes and Objects</h3>
                <p>Class is a blueprint, object is an instance.</p>
                
                <pre><code>class Student {
private:
    string name;
    int age;
public:
    void setData(string n, int a) {
        name = n;
        age = a;
    }
    void display() {
        cout << name << " " << age;
    }
};</code></pre>
                
                <h3>2. Four Pillars of OOP</h3>
                
                <h4>Encapsulation</h4>
                <p>Bundling data and methods together.</p>
                
                <h4>Inheritance</h4>
                <p>Acquiring properties from parent class.</p>
                
                <h4>Polymorphism</h4>
                <p>Same function, different behavior.</p>
                
                <h4>Abstraction</h4>
                <p>Hiding implementation details.</p>
            `
        },
        {
            id: 23,
            title: "Database Management Systems",
            description: "SQL, normalization, ER diagrams, and database design",
            class: "12",
            date: "2024-02-04",
            views: 2650,
            tags: ["dbms", "sql", "database"],
            content: `
                <h2>Database Management Systems</h2>
                
                <h3>1. Introduction to DBMS</h3>
                <p>Software for creating and managing databases.</p>
                
                <h3>2. SQL Commands</h3>
                
                <h4>DDL (Data Definition Language)</h4>
                <ul>
                    <li>CREATE</li>
                    <li>ALTER</li>
                    <li>DROP</li>
                </ul>
                
                <h4>DML (Data Manipulation Language)</h4>
                <ul>
                    <li>SELECT</li>
                    <li>INSERT</li>
                    <li>UPDATE</li>
                    <li>DELETE</li>
                </ul>
                
                <h3>3. Normalization</h3>
                <ul>
                    <li>1NF: No repeating groups</li>
                    <li>2NF: No partial dependency</li>
                    <li>3NF: No transitive dependency</li>
                </ul>
                
                <h3>Example Queries</h3>
                <pre><code>-- Create table
CREATE TABLE Students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

-- Insert data
INSERT INTO Students VALUES (1, 'John', 20);

-- Select data
SELECT * FROM Students WHERE age > 18;</code></pre>
            `
        }
    ],

    // ==================== ACCOUNTANCY NOTES ====================
    accountancy: [
        {
            id: 33,
            title: "Financial Accounting - Journal Entries",
            description: "Complete guide to journal entries, ledger posting, and trial balance",
            class: "11",
            date: "2024-01-14",
            views: 2650,
            tags: ["accounting", "journal", "ledger"],
            content: `
                <h2>Journal Entries</h2>
                
                <h3>1. Double Entry System</h3>
                <p>Every transaction has two aspects - debit and credit.</p>
                
                <h3>2. Golden Rules</h3>
                
                <h4>Personal Account</h4>
                <p>Debit: The receiver</p>
                <p>Credit: The giver</p>
                
                <h4>Real Account</h4>
                <p>Debit: What comes in</p>
                <p>Credit: What goes out</p>
                
                <h4>Nominal Account</h4>
                <p>Debit: All expenses and losses</p>
                <p>Credit: All incomes and gains</p>
                
                <h3>3. Common Entries</h3>
                
                <h4>Capital Introduced</h4>
                <pre>Cash A/c                Dr.     100,000
    To Capital A/c                  100,000
(Being capital introduced)</pre>
                
                <h4>Purchase of Goods</h4>
                <pre>Purchase A/c            Dr.     50,000
    To Cash A/c                     50,000
(Being goods purchased)</pre>
                
                <h4>Sale of Goods</h4>
                <pre>Cash A/c                Dr.     60,000
    To Sales A/c                    60,000
(Being goods sold)</pre>
            `
        },
        {
            id: 34,
            title: "Final Accounts Preparation",
            description: "Trading account, P&L account, and balance sheet",
            class: "12",
            date: "2024-02-02",
            views: 2420,
            tags: ["final accounts", "balance sheet", "p&l"],
            content: `
                <h2>Final Accounts</h2>
                
                <h3>1. Trading Account</h3>
                <p>Shows gross profit or loss.</p>
                
                <h4>Format</h4>
                <table>
                    <tr>
                        <th>Particulars</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>Opening Stock</td>
                        <td>XXX</td>
                    </tr>
                    <tr>
                        <td>Purchases</td>
                        <td>XXX</td>
                    </tr>
                    <tr>
                        <td>Less: Closing Stock</td>
                        <td>(XXX)</td>
                    </tr>
                    <tr>
                        <td>Cost of Goods Sold</td>
                        <td>XXX</td>
                    </tr>
                    <tr>
                        <td>Sales</td>
                        <td>XXX</td>
                    </tr>
                    <tr>
                        <td><strong>Gross Profit</strong></td>
                        <td><strong>XXX</strong></td>
                    </tr>
                </table>
                
                <h3>2. Profit & Loss Account</h3>
                <p>Shows net profit or loss.</p>
                
                <h3>3. Balance Sheet</h3>
                <p>Shows financial position on a particular date.</p>
                
                <h4>Format</h4>
                <table>
                    <tr>
                        <th>Liabilities</th>
                        <th>Amount</th>
                        <th>Assets</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>Capital</td>
                        <td>XXX</td>
                        <td>Fixed Assets</td>
                        <td>XXX</td>
                    </tr>
                    <tr>
                        <td>Liabilities</td>
                        <td>XXX</td>
                        <td>Current Assets</td>
                        <td>XXX</td>
                    </tr>
                </table>
            `
        }
    ],

    // ==================== ECONOMICS NOTES ====================
    economics: [
        {
            id: 37,
            title: "Microeconomics - Demand and Supply",
            description: "Law of demand, supply, market equilibrium, and elasticity",
            class: "11",
            date: "2024-01-17",
            views: 2320,
            tags: ["microeconomics", "demand", "supply"],
            content: `
                <h2>Demand and Supply</h2>
                
                <h3>1. Law of Demand</h3>
                <p>As price increases, quantity demanded decreases, and vice versa.</p>
                
                <h3>2. Law of Supply</h3>
                <p>As price increases, quantity supplied increases, and vice versa.</p>
                
                <h3>3. Market Equilibrium</h3>
                <p>Point where quantity demanded equals quantity supplied.</p>
                
                <h3>4. Elasticity of Demand</h3>
                <p><code>PED = (% change in Qd) / (% change in Price)</code></p>
                
                <h4>Types</h4>
                <ul>
                    <li>Elastic (Ed > 1)</li>
                    <li>Unit Elastic (Ed = 1)</li>
                    <li>Inelastic (Ed < 1)</li>
                </ul>
                
                <h3>Practice Problems</h3>
                <p><strong>Problem 1:</strong> Price increases from Rs. 10 to Rs. 12, Qd decreases from 100 to 80. Find PED.</p>
                <p><strong>Solution:</strong></p>
                <p>% change in Qd = -20%</p>
                <p>% change in P = 20%</p>
                <p>PED = -20% / 20% = -1 (Unit elastic)</p>
            `
        },
        {
            id: 38,
            title: "Macroeconomics - National Income",
            description: "GDP, GNP, NNP, and national income calculation",
            class: "12",
            date: "2024-02-09",
            views: 2050,
            tags: ["macroeconomics", "gdp", "national income"],
            content: `
                <h2>National Income</h2>
                
                <h3>1. Concepts</h3>
                
                <h4>GDP (Gross Domestic Product)</h4>
                <p>Total value of goods and services produced within a country.</p>
                
                <h4>GNP (Gross National Product)</h4>
                <p>GDP + Net factor income from abroad</p>
                
                <h4>NNP (Net National Product)</h4>
                <p>GNP - Depreciation</p>
                
                <h4>National Income</h4>
                <p>NNP at factor cost</p>
                
                <h3>2. Methods of Calculation</h3>
                <ul>
                    <li>Product Method</li>
                    <li>Income Method</li>
                    <li>Expenditure Method</li>
                </ul>
                
                <h3>3. Formulas</h3>
                <ul>
                    <li>GNP = GDP + NFIA</li>
                    <li>NNP = GNP - Depreciation</li>
                    <li>NI = NNP - Indirect Taxes + Subsidies</li>
                </ul>
            `
        }
    ],

    // ==================== BUSINESS STUDIES NOTES ====================
    business: [
        {
            id: 41,
            title: "Principles of Management",
            description: "Planning, organizing, staffing, directing, and controlling",
            class: "bachelor",
            date: "2024-01-11",
            views: 2580,
            tags: ["management", "principles", "functions"],
            content: `
                <h2>Principles of Management</h2>
                
                <h3>1. Functions of Management</h3>
                
                <h4>Planning</h4>
                <p>Deciding in advance what to do, how to do, when to do, and who will do it.</p>
                
                <h4>Organizing</h4>
                <p>Arranging resources and tasks to achieve objectives.</p>
                
                <h4>Staffing</h4>
                <p>Recruiting, selecting, and training employees.</p>
                
                <h4>Directing</h4>
                <p>Guiding and motivating employees.</p>
                
                <h4>Controlling</h4>
                <p>Monitoring performance and taking corrective action.</p>
                
                <h3>2. Levels of Management</h3>
                <ul>
                    <li>Top Management</li>
                    <li>Middle Management</li>
                    <li>Lower Management</li>
                </ul>
                
                <h3>3. Management Skills</h3>
                <ul>
                    <li>Technical Skills</li>
                    <li>Human Skills</li>
                    <li>Conceptual Skills</li>
                </ul>
            `
        },
        {
            id: 42,
            title: "Marketing Management",
            description: "Marketing mix, segmentation, targeting, and positioning",
            class: "bachelor",
            date: "2024-01-26",
            views: 2340,
            tags: ["marketing", "4p", "segmentation"],
            content: `
                <h2>Marketing Management</h2>
                
                <h3>1. Marketing Mix (4Ps)</h3>
                
                <h4>Product</h4>
                <p>Goods or services offered to customers.</p>
                
                <h4>Price</h4>
                <p>Amount charged for the product.</p>
                
                <h4>Place</h4>
                <p>Distribution channels and locations.</p>
                
                <h4>Promotion</h4>
                <p>Communication to inform and persuade customers.</p>
                
                <h3>2. Market Segmentation</h3>
                <p>Dividing market into distinct groups.</p>
                
                <h4>Bases</h4>
                <ul>
                    <li>Geographic</li>
                    <li>Demographic</li>
                    <li>Psychographic</li>
                    <li>Behavioral</li>
                </ul>
                
                <h3>3. STP Model</h3>
                <ul>
                    <li>Segmentation</li>
                    <li>Targeting</li>
                    <li>Positioning</li>
                </ul>
            `
        }
    ],

    // ==================== ENGLISH NOTES ====================
    english: [
        {
            id: 26,
            title: "Grammar Essentials - Tenses",
            description: "Complete guide to all English tenses with examples",
            class: "11",
            date: "2024-01-16",
            views: 2450,
            tags: ["grammar", "tenses", "english"],
            content: `
                <h2>English Tenses</h2>
                
                <h3>1. Present Tense</h3>
                
                <h4>Simple Present</h4>
                <p>Used for habitual actions and universal truths.</p>
                <p>Example: I study every day.</p>
                
                <h4>Present Continuous</h4>
                <p>Used for ongoing actions.</p>
                <p>Example: I am studying now.</p>
                
                <h4>Present Perfect</h4>
                <p>Used for completed actions with present relevance.</p>
                <p>Example: I have studied this chapter.</p>
                
                <h3>2. Past Tense</h3>
                
                <h4>Simple Past</h4>
                <p>Used for completed actions in the past.</p>
                <p>Example: I studied yesterday.</p>
                
                <h4>Past Continuous</h4>
                <p>Used for ongoing actions in the past.</p>
                <p>Example: I was studying at 8 PM.</p>
                
                <h3>3. Future Tense</h3>
                
                <h4>Simple Future</h4>
                <p>Used for future actions.</p>
                <p>Example: I will study tomorrow.</p>
            `
        },
        {
            id: 27,
            title: "Essay Writing Techniques",
            description: "How to write effective essays and compositions",
            class: "12",
            date: "2024-02-03",
            views: 2180,
            tags: ["essay", "writing", "composition"],
            content: `
                <h2>Essay Writing</h2>
                
                <h3>1. Structure</h3>
                
                <h4>Introduction</h4>
                <ul>
                    <li>Hook the reader</li>
                    <li>Provide background</li>
                    <li>State thesis</li>
                </ul>
                
                <h4>Body Paragraphs</h4>
                <ul>
                    <li>Topic sentence</li>
                    <li>Supporting details</li>
                    <li>Examples</li>
                    <li>Concluding sentence</li>
                </ul>
                
                <h4>Conclusion</h4>
                <ul>
                    <li>Restate thesis</li>
                    <li>Summarize main points</li>
                    <li>Final thought</li>
                </ul>
                
                <h3>2. Types of Essays</h3>
                <ul>
                    <li>Narrative</li>
                    <li>Descriptive</li>
                    <li>Expository</li>
                    <li>Argumentative</li>
                </ul>
            `
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = notesDatabase;
}