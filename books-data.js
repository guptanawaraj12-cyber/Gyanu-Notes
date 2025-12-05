// ==================== COMPLETE BOOKS DATABASE WITH CONTENT ====================

const booksDatabase = {
    
    // ==================== CLASS 11 BOOKS ====================
    class11: {
        physics: [
            {
                id: 1,
                title: "Physics Class 11 - Complete Guide",
                author: "NEB Curriculum Development Center",
                publisher: "CDC Nepal",
                class: "11",
                subject: "physics",
                description: "Official NEB textbook covering mechanics, heat, optics, and sound. Complete syllabus with theory, examples, and exercises.",
                isbn: "978-9937-0-0000-1",
                pages: 350,
                language: "English",
                downloadLink: "#",
                previewLink: "book-detail.html?id=1",
                coverImage: "https://via.placeholder.com/150x200?text=Physics+11",
                content: `
                    <h2>Physics Class 11 - Complete Textbook</h2>
                    
                    <h3>Table of Contents</h3>
                    <ol>
                        <li>Physical World and Measurement</li>
                        <li>Kinematics</li>
                        <li>Laws of Motion</li>
                        <li>Work, Energy and Power</li>
                        <li>Motion of System of Particles and Rigid Body</li>
                        <li>Gravitation</li>
                        <li>Properties of Bulk Matter</li>
                        <li>Thermodynamics</li>
                        <li>Behavior of Perfect Gas and Kinetic Theory</li>
                        <li>Oscillations and Waves</li>
                    </ol>
                    
                    <h3>Chapter 1: Physical World and Measurement</h3>
                    
                    <h4>1.1 Introduction to Physics</h4>
                    <p>Physics is the study of nature and natural phenomena. It deals with matter, energy, and their interactions.</p>
                    
                    <h4>Scope of Physics</h4>
                    <ul>
                        <li><strong>Classical Physics:</strong> Mechanics, Thermodynamics, Electromagnetism</li>
                        <li><strong>Modern Physics:</strong> Quantum Mechanics, Relativity, Nuclear Physics</li>
                    </ul>
                    
                    <h4>1.2 Units and Measurements</h4>
                    
                    <h4>SI Units (International System of Units)</h4>
                    <table>
                        <tr>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Symbol</th>
                        </tr>
                        <tr>
                            <td>Length</td>
                            <td>Meter</td>
                            <td>m</td>
                        </tr>
                        <tr>
                            <td>Mass</td>
                            <td>Kilogram</td>
                            <td>kg</td>
                        </tr>
                        <tr>
                            <td>Time</td>
                            <td>Second</td>
                            <td>s</td>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>Kelvin</td>
                            <td>K</td>
                        </tr>
                        <tr>
                            <td>Electric Current</td>
                            <td>Ampere</td>
                            <td>A</td>
                        </tr>
                        <tr>
                            <td>Amount of Substance</td>
                            <td>Mole</td>
                            <td>mol</td>
                        </tr>
                        <tr>
                            <td>Luminous Intensity</td>
                            <td>Candela</td>
                            <td>cd</td>
                        </tr>
                    </table>
                    
                    <h4>Dimensional Analysis</h4>
                    <p>Every physical quantity can be expressed in terms of fundamental dimensions.</p>
                    <p>Fundamental Dimensions: [M], [L], [T]</p>
                    
                    <h4>Examples:</h4>
                    <ul>
                        <li>Velocity: [LT⁻¹]</li>
                        <li>Acceleration: [LT⁻²]</li>
                        <li>Force: [MLT⁻²]</li>
                        <li>Energy: [ML²T⁻²]</li>
                    </ul>
                    
                    <h4>1.3 Significant Figures</h4>
                    <p>Significant figures are the digits in a number that carry meaningful information.</p>
                    
                    <h4>Rules:</h4>
                    <ol>
                        <li>All non-zero digits are significant</li>
                        <li>Zeros between non-zero digits are significant</li>
                        <li>Leading zeros are not significant</li>
                        <li>Trailing zeros after decimal are significant</li>
                    </ol>
                    
                    <h3>Chapter 2: Kinematics</h3>
                    
                    <h4>2.1 Motion in a Straight Line</h4>
                    <p>Motion is the change in position of an object with respect to time.</p>
                    
                    <h4>Key Concepts:</h4>
                    <ul>
                        <li><strong>Distance:</strong> Total path length (scalar)</li>
                        <li><strong>Displacement:</strong> Shortest distance between initial and final position (vector)</li>
                        <li><strong>Speed:</strong> Distance per unit time (scalar)</li>
                        <li><strong>Velocity:</strong> Displacement per unit time (vector)</li>
                        <li><strong>Acceleration:</strong> Rate of change of velocity</li>
                    </ul>
                    
                    <h4>Equations of Motion</h4>
                    <p>For uniformly accelerated motion:</p>
                    <ol>
                        <li><code>v = u + at</code></li>
                        <li><code>s = ut + ½at²</code></li>
                        <li><code>v² = u² + 2as</code></li>
                    </ol>
                    
                    <h4>Example Problems:</h4>
                    
                    <p><strong>Problem 1:</strong> A car starts from rest and accelerates uniformly at 2 m/s² for 10 seconds. Find:</p>
                    <p>(a) Final velocity</p>
                    <p>(b) Distance covered</p>
                    
                    <p><strong>Solution:</strong></p>
                    <p>Given: u = 0, a = 2 m/s², t = 10 s</p>
                    
                    <p>(a) Using v = u + at</p>
                    <p>v = 0 + 2(10) = 20 m/s</p>
                    
                    <p>(b) Using s = ut + ½at²</p>
                    <p>s = 0(10) + ½(2)(10)² = 100 m</p>
                    
                    <h4>2.2 Motion in a Plane</h4>
                    <p>Motion in two dimensions can be analyzed by resolving into components.</p>
                    
                    <h4>Projectile Motion</h4>
                    <p>Motion of an object thrown at an angle to the horizontal.</p>
                    
                    <h4>Key Formulas:</h4>
                    <ul>
                        <li>Time of flight: <code>T = (2u sin θ) / g</code></li>
                        <li>Maximum height: <code>H = (u² sin² θ) / (2g)</code></li>
                        <li>Range: <code>R = (u² sin 2θ) / g</code></li>
                    </ul>
                    
                    <h3>Chapter 3: Laws of Motion</h3>
                    
                    <h4>3.1 Newton's First Law</h4>
                    <p>An object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.</p>
                    
                    <h4>3.2 Newton's Second Law</h4>
                    <p><code>F = ma</code></p>
                    <p>Force equals mass times acceleration.</p>
                    
                    <h4>3.3 Newton's Third Law</h4>
                    <p>For every action, there is an equal and opposite reaction.</p>
                    
                    <h4>Applications:</h4>
                    <ul>
                        <li>Walking and running</li>
                        <li>Rocket propulsion</li>
                        <li>Recoil of gun</li>
                        <li>Swimming</li>
                    </ul>
                    
                    <h3>Chapter 4: Work, Energy and Power</h3>
                    
                    <h4>4.1 Work</h4>
                    <p><code>W = F × s × cos θ</code></p>
                    <p>Work is done when force causes displacement.</p>
                    
                    <h4>4.2 Energy</h4>
                    <p>Energy is the capacity to do work.</p>
                    
                    <h4>Types:</h4>
                    <ul>
                        <li><strong>Kinetic Energy:</strong> KE = ½mv²</li>
                        <li><strong>Potential Energy:</strong> PE = mgh</li>
                    </ul>
                    
                    <h4>4.3 Conservation of Energy</h4>
                    <p>Energy can neither be created nor destroyed, only transformed.</p>
                    
                    <h4>4.4 Power</h4>
                    <p><code>P = W / t</code></p>
                    <p>Power is the rate of doing work.</p>
                    <p>Unit: Watt (W) = Joule/second</p>
                    
                    <h3>Practice Exercises</h3>
                    
                    <h4>Exercise 1: Kinematics</h4>
                    <ol>
                        <li>A ball is thrown vertically upward with velocity 20 m/s. Find maximum height.</li>
                        <li>A car accelerates from 10 m/s to 30 m/s in 5 seconds. Find acceleration.</li>
                        <li>An object travels 100 m in 10 seconds with uniform acceleration. If initial velocity is 5 m/s, find acceleration.</li>
                    </ol>
                    
                    <h4>Exercise 2: Laws of Motion</h4>
                    <ol>
                        <li>A force of 100 N acts on a mass of 20 kg. Find acceleration.</li>
                        <li>A 5 kg object is pulled with force 30 N. If friction is 10 N, find acceleration.</li>
                        <li>Two masses 2 kg and 3 kg are connected by a string. If 10 N force is applied, find acceleration.</li>
                    </ol>
                    
                    <h4>Exercise 3: Work and Energy</h4>
                    <ol>
                        <li>A 10 kg object is lifted to height 5 m. Find work done. (g = 10 m/s²)</li>
                        <li>A car of mass 1000 kg moving at 20 m/s. Find kinetic energy.</li>
                        <li>A machine does 5000 J of work in 10 seconds. Find power.</li>
                    </ol>
                    
                    <h3>Important Formulas Summary</h3>
                    
                    <h4>Kinematics:</h4>
                    <ul>
                        <li>v = u + at</li>
                        <li>s = ut + ½at²</li>
                        <li>v² = u² + 2as</li>
                    </ul>
                    
                    <h4>Laws of Motion:</h4>
                    <ul>
                        <li>F = ma</li>
                        <li>Weight: W = mg</li>
                        <li>Friction: f = μN</li>
                    </ul>
                    
                    <h4>Work, Energy, Power:</h4>
                    <ul>
                        <li>W = F × s × cos θ</li>
                        <li>KE = ½mv²</li>
                        <li>PE = mgh</li>
                        <li>P = W/t</li>
                    </ul>
                    
                    <h3>Appendix: Constants and Values</h3>
                    <ul>
                        <li>Acceleration due to gravity: g = 9.8 m/s²</li>
                        <li>Speed of light: c = 3 × 10⁸ m/s</li>
                        <li>Planck's constant: h = 6.626 × 10⁻³⁴ J·s</li>
                        <li>Gravitational constant: G = 6.67 × 10⁻¹¹ N·m²/kg²</li>
                    </ul>
                `
            },
            {
                id: 2,
                title: "Fundamentals of Physics - Halliday & Resnick",
                author: "Halliday, Resnick & Walker",
                publisher: "Wiley",
                class: "11",
                subject: "physics",
                description: "Comprehensive physics reference book with detailed explanations, solved problems, and practice exercises.",
                isbn: "978-1-118-23072-5",
                pages: 1328,
                language: "English",
                downloadLink: "#",
                previewLink: "book-detail.html?id=2",
                coverImage: "https://via.placeholder.com/150x200?text=Halliday",
                content: `
                    <h2>Fundamentals of Physics</h2>
                    <p class="book-subtitle">Extended 10th Edition</p>
                    
                    <h3>About This Book</h3>
                    <p>Fundamentals of Physics is renowned for its clear and accessible approach to physics. This extended edition provides comprehensive coverage of classical and modern physics topics with real-world applications.</p>
                    
                    <h3>Part 1: Mechanics</h3>
                    
                    <h4>Chapter 1: Measurement</h4>
                    <p>Physics is based on measurement of physical quantities. Reliable measurements require reliable units.</p>
                    
                    <h4>The International System of Units</h4>
                    <p>The SI system is built on seven base units corresponding to seven base quantities.</p>
                    
                    <h4>Changing Units</h4>
                    <p>We can convert between units using conversion factors.</p>
                    
                    <p><strong>Example:</strong> Convert 50 km/h to m/s</p>
                    <p>50 km/h = 50 × (1000 m)/(3600 s) = 13.89 m/s</p>
                    
                    <h4>Chapter 2: Motion Along a Straight Line</h4>
                    
                    <h4>Position and Displacement</h4>
                    <p>Position is where an object is located. Displacement is the change in position.</p>
                    
                    <h4>Average Velocity and Average Speed</h4>
                    <p>Average velocity = displacement / time interval</p>
                    <p>Average speed = total distance / time interval</p>
                    
                    <h4>Instantaneous Velocity and Speed</h4>
                    <p>Instantaneous velocity is the velocity at a specific instant.</p>
                    <p>v = dx/dt (derivative of position with respect to time)</p>
                    
                    <h4>Acceleration</h4>
                    <p>Acceleration is the rate of change of velocity.</p>
                    <p>a = dv/dt = d²x/dt²</p>
                    
                    <h4>Constant Acceleration</h4>
                    <p>When acceleration is constant, we can use kinematic equations:</p>
                    <ol>
                        <li>v = v₀ + at</li>
                        <li>x - x₀ = v₀t + ½at²</li>
                        <li>v² = v₀² + 2a(x - x₀)</li>
                        <li>x - x₀ = ½(v₀ + v)t</li>
                        <li>x - x₀ = vt - ½at²</li>
                    </ol>
                    
                    <h4>Free-Fall Acceleration</h4>
                    <p>Near Earth's surface, all objects fall with the same acceleration g = 9.8 m/s² (downward).</p>
                    
                    <h4>Sample Problem:</h4>
                    <p><strong>Problem:</strong> A stone is dropped from a cliff 80 m high. How long does it take to reach the ground?</p>
                    
                    <p><strong>Solution:</strong></p>
                    <p>Given: y₀ = 80 m, y = 0, v₀ = 0, a = -g = -9.8 m/s²</p>
                    <p>Using y = y₀ + v₀t + ½at²</p>
                    <p>0 = 80 + 0 - ½(9.8)t²</p>
                    <p>4.9t² = 80</p>
                    <p>t = √(80/4.9) = 4.04 s</p>
                    
                    <h4>Chapter 3: Vectors</h4>
                    
                    <h4>Vector Addition</h4>
                    <p>Vectors can be added graphically (head-to-tail method) or by components.</p>
                    
                    <h4>Components of Vectors</h4>
                    <p>Any vector can be resolved into components:</p>
                    <p>aₓ = a cos θ</p>
                    <p>aᵧ = a sin θ</p>
                    
                    <h4>Unit Vectors</h4>
                    <p>î, ĵ, k̂ are unit vectors along x, y, z axes.</p>
                    <p>→a = aₓî + aᵧĵ + aᵧk̂</p>
                    
                    <h4>Dot Product</h4>
                    <p>→a · →b = ab cos θ = aₓbₓ + aᵧbᵧ + aᵧbᵧ</p>
                    
                    <h4>Cross Product</h4>
                    <p>→a × →b = ab sin θ n̂</p>
                    
                    <h4>Chapter 4: Motion in Two and Three Dimensions</h4>
                    
                    <h4>Position and Displacement</h4>
                    <p>→r = xî + yĵ + zk̂</p>
                    
                    <h4>Velocity and Acceleration</h4>
                    <p>→v = d→r/dt</p>
                    <p>→a = d→v/dt</p>
                    
                    <h4>Projectile Motion</h4>
                    <p>Horizontal motion: x = (v₀ cos θ₀)t</p>
                    <p>Vertical motion: y = (v₀ sin θ₀)t - ½gt²</p>
                    
                    <h4>Range and Maximum Height</h4>
                    <p>Range: R = (v₀² sin 2θ₀)/g</p>
                    <p>Maximum height: H = (v₀² sin² θ₀)/(2g)</p>
                    
                    <h4>Uniform Circular Motion</h4>
                    <p>Centripetal acceleration: a = v²/r</p>
                    
                    <h3>Part 2: Energy and Momentum</h3>
                    
                    <h4>Chapter 7: Kinetic Energy and Work</h4>
                    
                    <h4>Kinetic Energy</h4>
                    <p>K = ½mv²</p>
                    
                    <h4>Work</h4>
                    <p>W = F·d = Fd cos φ</p>
                    
                    <h4>Work-Energy Theorem</h4>
                    <p>W = ΔK = Kf - Ki</p>
                    
                    <h4>Power</h4>
                    <p>P = dW/dt = F·v</p>
                    
                    <h4>Chapter 8: Potential Energy and Conservation of Energy</h4>
                    
                    <h4>Potential Energy</h4>
                    <p>Gravitational: U = mgy</p>
                    <p>Elastic: U = ½kx²</p>
                    
                    <h4>Conservation of Mechanical Energy</h4>
                    <p>If only conservative forces act:</p>
                    <p>Ki + Ui = Kf + Uf</p>
                    
                    <h4>Sample Problem:</h4>
                    <p><strong>Problem:</strong> A 2 kg block slides down a frictionless ramp from height 5 m. Find its speed at the bottom.</p>
                    
                    <p><strong>Solution:</strong></p>
                    <p>Using conservation of energy:</p>
                    <p>mgh = ½mv²</p>
                    <p>v = √(2gh) = √(2 × 9.8 × 5) = 9.9 m/s</p>
                    
                    <h3>Review Questions</h3>
                    
                    <h4>Chapter 1-2:</h4>
                    <ol>
                        <li>What are the seven SI base units?</li>
                        <li>Distinguish between distance and displacement.</li>
                        <li>What is the difference between speed and velocity?</li>
                        <li>Derive the equation v² = v₀² + 2a(x - x₀)</li>
                    </ol>
                    
                    <h4>Chapter 3-4:</h4>
                    <ol>
                        <li>How do you add vectors using components?</li>
                        <li>What is the physical meaning of dot product?</li>
                        <li>Derive the range formula for projectile motion.</li>
                        <li>Why is centripetal acceleration directed toward the center?</li>
                    </ol>
                    
                    <h3>Problem Sets</h3>
                    
                    <h4>Set 1: Kinematics</h4>
                    <ol>
                        <li>A car accelerates from rest to 25 m/s in 8 seconds. Find (a) acceleration (b) distance covered.</li>
                        <li>A ball is thrown upward with initial velocity 15 m/s. Find (a) maximum height (b) time to return.</li>
                        <li>Two cars start from same point. Car A travels at 60 km/h, Car B starts 1 hour later at 80 km/h. When will B catch A?</li>
                    </ol>
                    
                    <h4>Set 2: Vectors</h4>
                    <ol>
                        <li>Find the magnitude and direction of →a = 3î + 4ĵ</li>
                        <li>If →a = 2î + 3ĵ and →b = 4î - 2ĵ, find →a + →b and →a · →b</li>
                        <li>A force →F = 10î + 15ĵ N acts on an object. Find work done if displacement is →d = 5î + 3ĵ m</li>
                    </ol>
                    
                    <h3>Answers to Selected Problems</h3>
                    
                    <h4>Set 1:</h4>
                    <ol>
                        <li>(a) 3.125 m/s² (b) 100 m</li>
                        <li>(a) 11.48 m (b) 3.06 s</li>
                        <li>3 hours after Car A started</li>
                    </ol>
                    
                    <h4>Set 2:</h4>
                    <ol>
                        <li>Magnitude = 5, Direction = 53.13° from x-axis</li>
                        <li>→a + →b = 6î + ĵ, →a · →b = 2</li>
                        <li>W = 95 J</li>
                    </ol>
                `
            }
        ],
        
        chemistry: [
            {
                id: 4,
                title: "Chemistry Class 11 - Complete Textbook",
                author: "NEB Curriculum Development Center",
                publisher: "CDC Nepal",
                class: "11",
                subject: "chemistry",
                description: "Official NEB chemistry textbook covering general and physical chemistry concepts with practical applications.",
                isbn: "978-9937-0-0000-2",
                pages: 320,
                language: "English",
                downloadLink: "#",
                previewLink: "book-detail.html?id=4",
                coverImage: "https://via.placeholder.com/150x200?text=Chemistry+11",
                content: `
                    <h2>Chemistry Class 11</h2>
                    
                    <h3>Table of Contents</h3>
                    <ol>
                        <li>Some Basic Concepts of Chemistry</li>
                        <li>Structure of Atom</li>
                        <li>Classification of Elements and Periodicity</li>
                        <li>Chemical Bonding and Molecular Structure</li>
                        <li>States of Matter</li>
                        <li>Thermodynamics</li>
                        <li>Equilibrium</li>
                        <li>Redox Reactions</li>
                        <li>Hydrogen</li>
                        <li>The s-Block Elements</li>
                        <li>The p-Block Elements</li>
                        <li>Organic Chemistry - Basic Principles</li>
                        <li>Hydrocarbons</li>
                        <li>Environmental Chemistry</li>
                    </ol>
                    
                    <h3>Chapter 1: Some Basic Concepts of Chemistry</h3>
                    
                    <h4>1.1 Importance of Chemistry</h4>
                    <p>Chemistry is the science that deals with the composition, structure, and properties of matter and the changes it undergoes.</p>
                    
                    <h4>1.2 Nature of Matter</h4>
                    <p>Matter is anything that has mass and occupies space.</p>
                    
                    <h4>Classification of Matter:</h4>
                    <ul>
                        <li><strong>Pure Substances:</strong> Elements and Compounds</li>
                        <li><strong>Mixtures:</strong> Homogeneous and Heterogeneous</li>
                    </ul>
                    
                    <h4>1.3 Properties of Matter</h4>
                    <ul>
                        <li><strong>Physical Properties:</strong> Can be observed without changing composition (color, melting point, density)</li>
                        <li><strong>Chemical Properties:</strong> Observed during chemical reaction (flammability, reactivity)</li>
                    </ul>
                    
                    <h4>1.4 Laws of Chemical Combination</h4>
                    
                    <h4>Law of Conservation of Mass</h4>
                    <p>Mass can neither be created nor destroyed in a chemical reaction.</p>
                    
                    <h4>Law of Definite Proportions</h4>
                    <p>A chemical compound always contains the same elements in the same proportion by mass.</p>
                    
                    <h4>Law of Multiple Proportions</h4>
                    <p>When two elements combine to form more than one compound, the masses of one element that combine with a fixed mass of the other are in a ratio of small whole numbers.</p>
                    
                    <h4>1.5 Dalton's Atomic Theory</h4>
                    <ol>
                        <li>Matter is made of tiny indivisible particles called atoms</li>
                        <li>Atoms of same element are identical</li>
                        <li>Atoms of different elements have different properties</li>
                        <li>Atoms combine in simple whole number ratios to form compounds</li>
                        <li>Atoms cannot be created or destroyed</li>
                    </ol>
                    
                    <h4>1.6 Atomic and Molecular Masses</h4>
                    
                    <h4>Atomic Mass Unit (amu)</h4>
                    <p>1 amu = 1/12 mass of C-12 atom = 1.66 × 10⁻²⁴ g</p>
                    
                    <h4>Molecular Mass</h4>
                    <p>Sum of atomic masses of all atoms in a molecule.</p>
                    
                    <p><strong>Example:</strong> H₂O</p>
                    <p>Molecular mass = 2(1) + 16 = 18 amu</p>
                    
                    <h4>1.7 Mole Concept</h4>
                    <p>One mole = 6.022 × 10²³ particles (Avogadro's number)</p>
                    
                    <h4>Molar Mass</h4>
                    <p>Mass of one mole of substance (g/mol)</p>
                    
                    <h4>Calculations:</h4>
                    <p>Number of moles = Mass / Molar mass</p>
                    <p>Number of particles = Moles × Avogadro's number</p>
                    
                    <p><strong>Example:</strong> How many molecules in 18 g of water?</p>
                    <p>Moles = 18/18 = 1 mol</p>
                    <p>Molecules = 1 × 6.022 × 10²³ = 6.022 × 10²³</p>
                    
                    <h4>1.8 Percentage Composition</h4>
                    <p>% of element = (Mass of element / Molecular mass) × 100</p>
                    
                    <p><strong>Example:</strong> Find % of H in H₂O</p>
                    <p>% H = (2/18) × 100 = 11.11%</p>
                    
                    <h4>1.9 Empirical and Molecular Formula</h4>
                    
                    <h4>Empirical Formula</h4>
                    <p>Simplest whole number ratio of atoms.</p>
                    
                    <h4>Molecular Formula</h4>
                    <p>Actual number of atoms in a molecule.</p>
                    <p>Molecular formula = n × Empirical formula</p>
                    
                    <h4>1.10 Stoichiometry</h4>
                    <p>Calculation of quantities in chemical reactions.</p>
                    
                    <p><strong>Example:</strong> 2H₂ + O₂ → 2H₂O</p>
                    <p>2 moles H₂ react with 1 mole O₂ to give 2 moles H₂O</p>
                    
                    <h3>Chapter 2: Structure of Atom</h3>
                    
                    <h4>2.1 Discovery of Subatomic Particles</h4>
                    
                    <h4>Electron</h4>
                    <p>Discovered by J.J. Thomson (1897)</p>
                    <p>Charge = -1.6 × 10⁻¹⁹ C</p>
                    <p>Mass = 9.1 × 10⁻³¹ kg</p>
                    
                    <h4>Proton</h4>
                    <p>Discovered by Goldstein</p>
                    <p>Charge = +1.6 × 10⁻¹⁹ C</p>
                    <p>Mass = 1.67 × 10⁻²⁷ kg</p>
                    
                    <h4>Neutron</h4>
                    <p>Discovered by Chadwick (1932)</p>
                    <p>Charge = 0</p>
                    <p>Mass = 1.67 × 10⁻²⁷ kg</p>
                    
                    <h4>2.2 Atomic Models</h4>
                    
                    <h4>Thomson's Model (Plum Pudding Model)</h4>
                    <p>Atom is a sphere of positive charge with electrons embedded in it.</p>
                    
                    <h4>Rutherford's Model</h4>
                    <p>Atom has a small, dense, positively charged nucleus with electrons revolving around it.</p>
                    
                    <h4>Bohr's Model</h4>
                    <p>Electrons revolve in fixed orbits with definite energy.</p>
                    <p>Energy of orbit: E = -13.6/n² eV</p>
                    
                    <h4>2.3 Quantum Mechanical Model</h4>
                    <p>Electrons exist in orbitals (regions of probability).</p>
                    
                    <h4>Quantum Numbers:</h4>
                    <ol>
                        <li><strong>Principal (n):</strong> Energy level (1, 2, 3...)</li>
                        <li><strong>Azimuthal (l):</strong> Subshell (0 to n-1)</li>
                        <li><strong>Magnetic (m):</strong> Orbital orientation (-l to +l)</li>
                        <li><strong>Spin (s):</strong> Electron spin (+½ or -½)</li>
                    </ol>
                    
                    <h4>2.4 Electronic Configuration</h4>
                    
                    <h4>Aufbau Principle</h4>
                    <p>Electrons fill orbitals in order of increasing energy.</p>
                    <p>Order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...</p>
                    
                    <h4>Pauli Exclusion Principle</h4>
                    <p>No two electrons can have the same set of four quantum numbers.</p>
                    
                    <h4>Hund's Rule</h4>
                    <p>Electrons occupy orbitals singly before pairing.</p>
                    
                    <p><strong>Examples:</strong></p>
                    <p>H (1): 1s¹</p>
                    <p>C (6): 1s² 2s² 2p²</p>
                    <p>O (8): 1s² 2s² 2p⁴</p>
                    <p>Na (11): 1s² 2s² 2p⁶ 3s¹</p>
                    
                    <h3>Practice Problems</h3>
                    
                    <h4>Chapter 1:</h4>
                    <ol>
                        <li>Calculate the number of moles in 44 g of CO₂.</li>
                        <li>Find the percentage composition of H₂SO₄.</li>
                        <li>A compound contains 40% C, 6.7% H, and 53.3% O. Find empirical formula.</li>
                        <li>How many atoms are in 0.5 moles of oxygen gas (O₂)?</li>
                    </ol>
                    
                    <h4>Chapter 2:</h4>
                    <ol>
                        <li>Write electronic configuration of Fe (26).</li>
                        <li>How many electrons can be accommodated in n=3 shell?</li>
                        <li>Calculate energy of electron in n=2 orbit of hydrogen.</li>
                        <li>Write quantum numbers for last electron of Cl (17).</li>
                    </ol>
                    
                    <h3>Answers:</h3>
                    
                    <h4>Chapter 1:</h4>
                    <ol>
                        <li>1 mole</li>
                        <li>H: 2.04%, S: 32.65%, O: 65.31%</li>
                        <li>CH₂O</li>
                        <li>6.022 × 10²³ molecules = 1.2044 × 10²⁴ atoms</li>
                    </ol>
                    
                    <h4>Chapter 2:</h4>
                    <ol>
                        <li>1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶</li>
                        <li>18 electrons</li>
                        <li>-3.4 eV</li>
                        <li>n=3, l=1, m=-1/0/+1, s=+½ or -½</li>
                    </ol>
                `
            }
        ],
        
        mathematics: [
            {
                id: 7,
                title: "Mathematics Class 11 - Complete Guide",
                author: "NEB Curriculum Development Center",
                publisher: "CDC Nepal",
                class: "11",
                subject: "mathematics",
                description: "Complete mathematics textbook with algebra, trigonometry, calculus, and coordinate geometry.",
                isbn: "978-9937-0-0000-3",
                pages: 400,
                language: "English",
                downloadLink: "#",
                previewLink: "book-detail.html?id=7",
                coverImage: "https://via.placeholder.com/150x200?text=Math+11",
                content: `
                    <h2>Mathematics Class 11</h2>
                    
                    <h3>Table of Contents</h3>
                    <ol>
                        <li>Sets, Relations and Functions</li>
                        <li>Algebra</li>
                        <li>Trigonometry</li>
                        <li>Coordinate Geometry</li>
                        <li>Calculus</li>
                        <li>Statistics and Probability</li>
                    </ol>
                    
                    <h3>Chapter 1: Sets</h3>
                    
                    <h4>1.1 Introduction to Sets</h4>
                    <p>A set is a well-defined collection of distinct objects.</p>
                    
                    <h4>Representation:</h4>
                    <ul>
                        <li><strong>Roster Form:</strong> A = {1, 2, 3, 4, 5}</li>
                        <li><strong>Set-Builder Form:</strong> A = {x : x is a natural number ≤ 5}</li>
                    </ul>
                    
                    <h4>Types of Sets:</h4>
                    <ul>
                        <li><strong>Empty Set:</strong> ∅ or {}</li>
                        <li><strong>Finite Set:</strong> Limited number of elements</li>
                        <li><strong>Infinite Set:</strong> Unlimited elements</li>
                        <li><strong>Universal Set:</strong> Set containing all elements under consideration</li>
                    </ul>
                    
                    <h4>1.2 Operations on Sets</h4>
                    
                    <h4>Union</h4>
                    <p>A ∪ B = {x : x ∈ A or x ∈ B}</p>
                    
                    <h4>Intersection</h4>
                    <p>A ∩ B = {x : x ∈ A and x ∈ B}</p>
                    
                    <h4>Difference</h4>
                    <p>A - B = {x : x ∈ A and x ∉ B}</p>
                    
                    <h4>Complement</h4>
                    <p>A' = {x : x ∈ U and x ∉ A}</p>
                    
                    <h4>1.3 Venn Diagrams</h4>
                    <p>Pictorial representation of sets and their relationships.</p>
                    
                    <h4>1.4 Laws of Set Operations</h4>
                    <ul>
                        <li>Commutative: A ∪ B = B ∪ A</li>
                        <li>Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)</li>
                        <li>Distributive: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</li>
                        <li>De Morgan's: (A ∪ B)' = A' ∩ B'</li>
                    </ul>
                    
                    <h3>Chapter 2: Algebra</h3>
                    
                    <h4>2.1 Complex Numbers</h4>
                    <p>A complex number is of the form z = a + ib</p>
                    <p>where i = √(-1), i² = -1</p>
                    
                    <h4>Operations:</h4>
                    <p>Addition: (a + ib) + (c + id) = (a + c) + i(b + d)</p>
                    <p>Multiplication: (a + ib)(c + id) = (ac - bd) + i(ad + bc)</p>
                    
                    <h4>Modulus and Argument</h4>
                    <p>|z| = √(a² + b²)</p>
                    <p>arg(z) = tan⁻¹(b/a)</p>
                    
                    <h4>2.2 Quadratic Equations</h4>
                    <p>ax² + bx + c = 0</p>
                    
                    <h4>Solutions:</h4>
                    <p>x = (-b ± √(b² - 4ac)) / 2a</p>
                    
                    <h4>Discriminant:</h4>
                    <p>D = b² - 4ac</p>
                    <ul>
                        <li>D > 0: Two real distinct roots</li>
                        <li>D = 0: Two equal real roots</li>
                        <li>D < 0: Two complex roots</li>
                    </ul>
                    
                    <h4>2.3 Sequences and Series</h4>
                    
                    <h4>Arithmetic Progression (AP)</h4>
                    <p>a, a+d, a+2d, a+3d, ...</p>
                    <p>nth term: aₙ = a + (n-1)d</p>
                    <p>Sum: Sₙ = n/2[2a + (n-1)d]</p>
                    
                    <h4>Geometric Progression (GP)</h4>
                    <p>a, ar, ar², ar³, ...</p>
                    <p>nth term: aₙ = arⁿ⁻¹</p>
                    <p>Sum: Sₙ = a(rⁿ - 1)/(r - 1)</p>
                    
                    <h3>Chapter 3: Trigonometry</h3>
                    
                    <h4>3.1 Trigonometric Ratios</h4>
                    <ul>
                        <li>sin θ = Opposite / Hypotenuse</li>
                        <li>cos θ = Adjacent / Hypotenuse</li>
                        <li>tan θ = Opposite / Adjacent</li>
                    </ul>
                    
                    <h4>3.2 Trigonometric Identities</h4>
                    <ul>
                        <li>sin²θ + cos²θ = 1</li>
                        <li>1 + tan²θ = sec²θ</li>
                        <li>1 + cot²θ = cosec²θ</li>
                    </ul>
                    
                    <h4>3.3 Compound Angles</h4>
                    <ul>
                        <li>sin(A + B) = sin A cos B + cos A sin B</li>
                        <li>cos(A + B) = cos A cos B - sin A sin B</li>
                        <li>tan(A + B) = (tan A + tan B)/(1 - tan A tan B)</li>
                    </ul>
                    
                    <h3>Chapter 4: Calculus</h3>
                    
                    <h4>4.1 Limits</h4>
                    <p>lim(x→a) f(x) = L</p>
                    
                    <h4>Standard Limits:</h4>
                    <ul>
                        <li>lim(x→0) (sin x)/x = 1</li>
                        <li>lim(x→0) (1 - cos x)/x = 0</li>
                        <li>lim(x→∞) (1 + 1/x)ˣ = e</li>
                    </ul>
                    
                    <h4>4.2 Derivatives</h4>
                    <p>f'(x) = lim(h→0) [f(x+h) - f(x)]/h</p>
                    
                    <h4>Standard Derivatives:</h4>
                    <ul>
                        <li>d/dx(xⁿ) = nxⁿ⁻¹</li>
                        <li>d/dx(sin x) = cos x</li>
                        <li>d/dx(cos x) = -sin x</li>
                        <li>d/dx(eˣ) = eˣ</li>
                        <li>d/dx(ln x) = 1/x</li>
                    </ul>
                    
                    <h3>Practice Problems</h3>
                    
                    <h4>Sets:</h4>
                    <ol>
                        <li>If A = {1, 2, 3} and B = {2, 3, 4}, find A ∪ B and A ∩ B</li>
                        <li>Verify De Morgan's law for A = {1, 2} and B = {2, 3}</li>
                    </ol>
                    
                    <h4>Algebra:</h4>
                    <ol>
                        <li>Solve: x² - 5x + 6 = 0</li>
                        <li>Find sum of first 20 terms of AP: 2, 5, 8, 11, ...</li>
                        <li>Find 5th term of GP: 3, 6, 12, ...</li>
                    </ol>
                    
                    <h4>Trigonometry:</h4>
                    <ol>
                        <li>If sin θ = 3/5, find cos θ and tan θ</li>
                        <li>Prove: sin²θ + cos²θ = 1</li>
                        <li>Find sin 75° using compound angle formula</li>
                    </ol>
                    
                    <h4>Calculus:</h4>
                    <ol>
                        <li>Evaluate: lim(x→2) (x² - 4)/(x - 2)</li>
                        <li>Find derivative of f(x) = x³ + 2x² - 5x + 3</li>
                        <li>Find dy/dx if y = sin(2x)</li>
                    </ol>
                    
                    <h3>Answers:</h3>
                    
                    <h4>Sets:</h4>
                    <ol>
                        <li>A ∪ B = {1, 2, 3, 4}, A ∩ B = {2, 3}</li>
                    </ol>
                    
                    <h4>Algebra:</h4>
                    <ol>
                        <li>x = 2 or x = 3</li>
                        <li>S₂₀ = 610</li>
                        <li>a₅ = 48</li>
                    </ol>
                    
                    <h4>Trigonometry:</h4>
                    <ol>
                        <li>cos θ = 4/5, tan θ = 3/4</li>
                        <li>sin 75° = (√6 + √2)/4</li>
                    </ol>
                    
                    <h4>Calculus:</h4>
                    <ol>
                        <li>4</li>
                        <li>f'(x) = 3x² + 4x - 5</li>
                        <li>dy/dx = 2cos(2x)</li>
                    </ol>
                `
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = booksDatabase;
}