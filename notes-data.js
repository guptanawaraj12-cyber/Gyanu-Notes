// ==================== NOTES DATABASE ====================
// All notes with written HTML content

const notesDatabase = {
    // Class 10 Notes
    '10': {
        science: [
            {
                id: 'n10s1',
                title: 'Chapter 1: Chemical Reactions and Equations',
                description: 'Complete notes on types of chemical reactions, balancing equations, and chemical changes',
                topics: ['Chemical Equations', 'Types of Reactions', 'Balancing', 'Oxidation-Reduction'],
                viewLink: 'note-detail.html?id=n10s1',
                lastUpdated: '2024-01-15',
                readTime: 15,
                content: `
                    <h2>1. Chemical Reactions and Equations</h2>
                    
                    <h3>1.1 What is a Chemical Reaction?</h3>
                    <p>A chemical reaction is a process in which one or more substances (reactants) are converted into one or more different substances (products). During a chemical reaction, the atoms of the reactants rearrange to form new products.</p>
                    
                    <div class="note-example">
                        <h4>Example:</h4>
                        <p>Burning of magnesium ribbon in air:</p>
                        <code>2Mg + O₂ → 2MgO</code>
                        <p>Here, magnesium (Mg) reacts with oxygen (O₂) to form magnesium oxide (MgO).</p>
                    </div>

                    <h3>1.2 Characteristics of Chemical Reactions</h3>
                    <ul>
                        <li>Change in state (solid, liquid, gas)</li>
                        <li>Change in color</li>
                        <li>Evolution of gas</li>
                        <li>Change in temperature</li>
                        <li>Formation of precipitate</li>
                    </ul>

                    <h3>1.3 Types of Chemical Reactions</h3>
                    
                    <h4>A. Combination Reaction</h4>
                    <p>Two or more substances combine to form a single product.</p>
                    <p><strong>General Form:</strong> <code>A + B → AB</code></p>
                    <div class="note-example">
                        <h4>Examples:</h4>
                        <p>1. <code>C + O₂ → CO₂</code> (Carbon burns in oxygen)</p>
                        <p>2. <code>CaO + H₂O → Ca(OH)₂</code> (Slaking of lime)</p>
                    </div>
                    
                    <h4>B. Decomposition Reaction</h4>
                    <p>A single compound breaks down into two or more simpler substances.</p>
                    <p><strong>General Form:</strong> <code>AB → A + B</code></p>
                    <div class="note-example">
                        <h4>Examples:</h4>
                        <p>1. <code>2H₂O → 2H₂ + O₂</code> (Electrolysis of water)</p>
                        <p>2. <code>CaCO₃ → CaO + CO₂</code> (Thermal decomposition)</p>
                    </div>

                    <h4>C. Displacement Reaction</h4>
                    <p>A more reactive element displaces a less reactive element from its compound.</p>
                    <p><strong>General Form:</strong> <code>A + BC → AC + B</code></p>
                    <div class="note-example">
                        <h4>Examples:</h4>
                        <p>1. <code>Zn + CuSO₄ → ZnSO₄ + Cu</code></p>
                        <p>2. <code>Fe + CuSO₄ → FeSO₄ + Cu</code></p>
                    </div>

                    <h4>D. Double Displacement Reaction</h4>
                    <p>Two compounds exchange their ions to form two new compounds.</p>
                    <p><strong>General Form:</strong> <code>AB + CD → AD + CB</code></p>
                    <div class="note-example">
                        <h4>Examples:</h4>
                        <p>1. <code>AgNO₃ + NaCl → AgCl + NaNO₃</code></p>
                        <p>2. <code>BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl</code></p>
                    </div>

                    <h3>1.4 Oxidation and Reduction</h3>
                    <p><strong>Oxidation:</strong> Addition of oxygen or removal of hydrogen</p>
                    <p><strong>Reduction:</strong> Removal of oxygen or addition of hydrogen</p>
                    
                    <div class="note-example">
                        <h4>Example:</h4>
                        <code>CuO + H₂ → Cu + H₂O</code>
                        <p>• CuO is <strong>reduced</strong> (oxygen removed)</p>
                        <p>• H₂ is <strong>oxidized</strong> (oxygen added)</p>
                    </div>

                    <h3>1.5 Balancing Chemical Equations</h3>
                    <p>The law of conservation of mass states that matter cannot be created or destroyed in a chemical reaction. Therefore, the number of atoms of each element must be equal on both sides of the equation.</p>
                    
                    <div class="note-steps">
                        <h4>Steps to Balance Chemical Equations:</h4>
                        <ol>
                            <li>Write the unbalanced equation</li>
                            <li>Count the number of atoms of each element on both sides</li>
                            <li>Add coefficients to balance the atoms</li>
                            <li>Verify that all atoms are balanced</li>
                            <li>Ensure coefficients are in the simplest ratio</li>
                        </ol>
                    </div>

                    <div class="note-example">
                        <h4>Example: Balance the equation</h4>
                        <p><strong>Unbalanced:</strong> <code>Fe + O₂ → Fe₂O₃</code></p>
                        <p><strong>Step 1:</strong> Count atoms - Fe: 1→2, O: 2→3 (unbalanced)</p>
                        <p><strong>Step 2:</strong> Balance Fe: <code>2Fe + O₂ → Fe₂O₃</code></p>
                        <p><strong>Step 3:</strong> Balance O: <code>4Fe + 3O₂ → 2Fe₂O₃</code></p>
                        <p><strong>Balanced:</strong> <code>4Fe + 3O₂ → 2Fe₂O₃</code></p>
                    </div>

                    <h3>Practice Questions</h3>
                    <ol>
                        <li>Balance the following equations:
                            <ul>
                                <li>H₂ + O₂ → H₂O</li>
                                <li>N₂ + H₂ → NH₃</li>
                                <li>Al + O₂ → Al₂O₃</li>
                            </ul>
                        </li>
                        <li>Identify the type of reaction:
                            <ul>
                                <li>CaCO₃ → CaO + CO₂</li>
                                <li>Zn + H₂SO₄ → ZnSO₄ + H₂</li>
                                <li>2H₂ + O₂ → 2H₂O</li>
                            </ul>
                        </li>
                        <li>What is oxidation? Give two examples.</li>
                        <li>Explain double displacement reaction with an example.</li>
                    </ol>

                    <h3>Key Points to Remember</h3>
                    <ul>
                        <li>Chemical reactions involve rearrangement of atoms</li>
                        <li>Mass is conserved in chemical reactions</li>
                        <li>There are four main types of reactions: combination, decomposition, displacement, and double displacement</li>
                        <li>Oxidation and reduction occur simultaneously (redox reactions)</li>
                        <li>Chemical equations must be balanced</li>
                    </ul>
                `
            },
            {
                id: 'n10s2',
                title: 'Chapter 2: Acids, Bases and Salts',
                description: 'Understanding properties of acids, bases, pH scale, and salt formation',
                topics: ['Acids', 'Bases', 'pH Scale', 'Indicators', 'Neutralization'],
                viewLink: 'note-detail.html?id=n10s2',
                lastUpdated: '2024-01-20',
                readTime: 18,
                content: `
                    <h2>2. Acids, Bases and Salts</h2>
                    
                    <h3>2.1 Introduction</h3>
                    <p>Acids, bases, and salts are important classes of chemical compounds that we encounter in our daily lives. They have distinct properties and play crucial roles in various chemical reactions.</p>

                    <h3>2.2 Acids</h3>
                    <p><strong>Definition:</strong> Acids are substances that produce hydrogen ions (H⁺) when dissolved in water.</p>
                    
                    <h4>Properties of Acids:</h4>
                    <ul>
                        <li>Sour in taste</li>
                        <li>Turn blue litmus paper red</li>
                        <li>Conduct electricity in aqueous solution</li>
                        <li>React with metals to produce hydrogen gas</li>
                        <li>React with bases to form salt and water</li>
                    </ul>

                    <div class="note-example">
                        <h4>Common Acids:</h4>
                        <ul>
                            <li><strong>Hydrochloric acid (HCl):</strong> Found in stomach, used in cleaning</li>
                            <li><strong>Sulfuric acid (H₂SO₄):</strong> Used in car batteries</li>
                            <li><strong>Nitric acid (HNO₃):</strong> Used in fertilizers</li>
                            <li><strong>Acetic acid (CH₃COOH):</strong> Found in vinegar</li>
                            <li><strong>Citric acid:</strong> Found in citrus fruits</li>
                        </ul>
                    </div>

                    <h3>2.3 Bases</h3>
                    <p><strong>Definition:</strong> Bases are substances that produce hydroxide ions (OH⁻) when dissolved in water.</p>
                    
                    <h4>Properties of Bases:</h4>
                    <ul>
                        <li>Bitter in taste</li>
                        <li>Soapy to touch</li>
                        <li>Turn red litmus paper blue</li>
                        <li>Conduct electricity in aqueous solution</li>
                        <li>React with acids to form salt and water</li>
                    </ul>

                    <div class="note-example">
                        <h4>Common Bases:</h4>
                        <ul>
                            <li><strong>Sodium hydroxide (NaOH):</strong> Used in soap making</li>
                            <li><strong>Calcium hydroxide (Ca(OH)₂):</strong> Used in whitewashing</li>
                            <li><strong>Magnesium hydroxide (Mg(OH)₂):</strong> Used as antacid</li>
                            <li><strong>Ammonium hydroxide (NH₄OH):</strong> Used in cleaning</li>
                        </ul>
                    </div>

                    <h3>2.4 pH Scale</h3>
                    <p>The pH scale measures how acidic or basic a solution is. It ranges from 0 to 14.</p>
                    
                    <ul>
                        <li><strong>pH < 7:</strong> Acidic solution</li>
                        <li><strong>pH = 7:</strong> Neutral solution</li>
                        <li><strong>pH > 7:</strong> Basic solution</li>
                    </ul>

                    <div class="note-example">
                        <h4>pH Values of Common Substances:</h4>
                        <ul>
                            <li>Lemon juice: pH 2-3</li>
                            <li>Vinegar: pH 3</li>
                            <li>Pure water: pH 7</li>
                            <li>Blood: pH 7.4</li>
                            <li>Baking soda: pH 9</li>
                            <li>Soap: pH 10</li>
                            <li>Bleach: pH 13</li>
                        </ul>
                    </div>

                    <h3>2.5 Indicators</h3>
                    <p>Indicators are substances that show different colors in acidic and basic solutions.</p>
                    
                    <h4>Common Indicators:</h4>
                    <ul>
                        <li><strong>Litmus:</strong> Red in acid, Blue in base</li>
                        <li><strong>Phenolphthalein:</strong> Colorless in acid, Pink in base</li>
                        <li><strong>Methyl orange:</strong> Red in acid, Yellow in base</li>
                        <li><strong>Turmeric:</strong> Yellow in acid, Red in base</li>
                    </ul>

                    <h3>2.6 Neutralization Reaction</h3>
                    <p>When an acid reacts with a base, they neutralize each other to form salt and water.</p>
                    <p><strong>General Equation:</strong> <code>Acid + Base → Salt + Water</code></p>

                    <div class="note-example">
                        <h4>Examples:</h4>
                        <p>1. <code>HCl + NaOH → NaCl + H₂O</code></p>
                        <p>2. <code>H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O</code></p>
                        <p>3. <code>HNO₃ + KOH → KNO₃ + H₂O</code></p>
                    </div>

                    <h3>2.7 Salts</h3>
                    <p>Salts are ionic compounds formed by the neutralization reaction between acids and bases.</p>
                    
                    <h4>Types of Salts:</h4>
                    <ul>
                        <li><strong>Normal Salt:</strong> Complete neutralization (e.g., NaCl)</li>
                        <li><strong>Acidic Salt:</strong> Partial neutralization (e.g., NaHSO₄)</li>
                        <li><strong>Basic Salt:</strong> Contains OH⁻ ions (e.g., Mg(OH)Cl)</li>
                    </ul>

                    <h3>2.8 Important Salts and Their Uses</h3>
                    <ul>
                        <li><strong>Sodium chloride (NaCl):</strong> Common salt, food preservation</li>
                        <li><strong>Sodium carbonate (Na₂CO₃):</strong> Washing soda, glass making</li>
                        <li><strong>Sodium bicarbonate (NaHCO₃):</strong> Baking soda, antacid</li>
                        <li><strong>Calcium carbonate (CaCO₃):</strong> Limestone, marble</li>
                        <li><strong>Calcium sulfate (CaSO₄):</strong> Plaster of Paris</li>
                    </ul>

                    <h3>Practice Questions</h3>
                    <ol>
                        <li>What is the pH of a neutral solution? Give examples.</li>
                        <li>Write the chemical equation for the reaction between:
                            <ul>
                                <li>Hydrochloric acid and sodium hydroxide</li>
                                <li>Sulfuric acid and potassium hydroxide</li>
                            </ul>
                        </li>
                        <li>Name three natural indicators and their color changes.</li>
                        <li>What is neutralization? Explain with an example.</li>
                        <li>List five uses of acids in daily life.</li>
                    </ol>

                    <h3>Key Points to Remember</h3>
                    <ul>
                        <li>Acids produce H⁺ ions, bases produce OH⁻ ions</li>
                        <li>pH scale ranges from 0 to 14</li>
                        <li>Indicators show different colors in acids and bases</li>
                        <li>Neutralization produces salt and water</li>
                        <li>Salts have various important uses in daily life</li>
                    </ul>
                `
            },
            {
                id: 'n10s3',
                title: 'Chapter 3: Metals and Non-metals',
                description: 'Properties, reactivity series, and uses of metals and non-metals',
                topics: ['Physical Properties', 'Chemical Properties', 'Reactivity Series', 'Corrosion'],
                viewLink: 'note-detail.html?id=n10s3',
                lastUpdated: '2024-01-25',
                readTime: 20,
                content: `
                    <h2>3. Metals and Non-metals</h2>
                    
                    <h3>3.1 Introduction</h3>
                    <p>Elements can be broadly classified into metals and non-metals based on their physical and chemical properties. This classification helps us understand their behavior and applications.</p>

                    <h3>3.2 Physical Properties of Metals</h3>
                    <ul>
                        <li><strong>Lustre:</strong> Metals have a shiny appearance</li>
                        <li><strong>Malleability:</strong> Can be beaten into thin sheets</li>
                        <li><strong>Ductility:</strong> Can be drawn into wires</li>
                        <li><strong>Conductivity:</strong> Good conductors of heat and electricity</li>
                        <li><strong>Sonority:</strong> Produce sound when struck</li>
                        <li><strong>High density:</strong> Generally heavy</li>
                        <li><strong>High melting point:</strong> Most metals have high melting points</li>
                    </ul>

                    <div class="note-example">
                        <h4>Examples of Metals:</h4>
                        <p>Iron (Fe), Copper (Cu), Aluminum (Al), Gold (Au), Silver (Ag), Zinc (Zn), Sodium (Na), Magnesium (Mg)</p>
                    </div>

                    <h3>3.3 Physical Properties of Non-metals</h3>
                    <ul>
                        <li><strong>No lustre:</strong> Dull appearance (except iodine and graphite)</li>
                        <li><strong>Brittle:</strong> Break easily when hammered</li>
                        <li><strong>Non-ductile:</strong> Cannot be drawn into wires</li>
                        <li><strong>Poor conductors:</strong> Bad conductors of heat and electricity (except graphite)</li>
                        <li><strong>No sonority:</strong> Do not produce sound</li>
                        <li><strong>Low density:</strong> Generally light</li>
                        <li><strong>Low melting point:</strong> Most non-metals have low melting points</li>
                    </ul>

                    <div class="note-example">
                        <h4>Examples of Non-metals:</h4>
                        <p>Oxygen (O), Nitrogen (N), Carbon (C), Sulfur (S), Phosphorus (P), Chlorine (Cl), Hydrogen (H)</p>
                    </div>

                    <h3>3.4 Chemical Properties of Metals</h3>
                    
                    <h4>A. Reaction with Oxygen</h4>
                    <p>Metals react with oxygen to form metal oxides (basic in nature).</p>
                    <div class="note-example">
                        <p><code>4Na + O₂ → 2Na₂O</code></p>
                        <p><code>2Mg + O₂ → 2MgO</code></p>
                    </div>

                    <h4>B. Reaction with Water</h4>
                    <p>Metals react with water to form metal hydroxides and hydrogen gas.</p>
                    <div class="note-example">
                        <p><code>2Na + 2H₂O → 2NaOH + H₂</code></p>
                        <p><code>Ca + 2H₂O → Ca(OH)₂ + H₂</code></p>
                    </div>

                    <h4>C. Reaction with Acids</h4>
                    <p>Metals react with acids to form salt and hydrogen gas.</p>
                    <div class="note-example">
                        <p><code>Zn + H₂SO₄ → ZnSO₄ + H₂</code></p>
                        <p><code>Mg + 2HCl → MgCl₂ + H₂</code></p>
                    </div>

                    <h3>3.5 Reactivity Series of Metals</h3>
                    <p>Metals are arranged in order of their reactivity, with the most reactive at the top.</p>
                    
                    <div class="note-steps">
                        <h4>Reactivity Series (Most to Least Reactive):</h4>
                        <ol>
                            <li>Potassium (K)</li>
                            <li>Sodium (Na)</li>
                            <li>Calcium (Ca)</li>
                            <li>Magnesium (Mg)</li>
                            <li>Aluminum (Al)</li>
                            <li>Zinc (Zn)</li>
                            <li>Iron (Fe)</li>
                            <li>Lead (Pb)</li>
                            <li>Copper (Cu)</li>
                            <li>Silver (Ag)</li>
                            <li>Gold (Au)</li>
                        </ol>
                    </div>

                    <h3>3.6 Extraction of Metals</h3>
                    <p>Metals are extracted from their ores through various processes depending on their reactivity.</p>
                    
                    <ul>
                        <li><strong>Highly reactive metals (K, Na, Ca, Mg):</strong> Electrolytic reduction</li>
                        <li><strong>Moderately reactive metals (Zn, Fe, Pb):</strong> Reduction with carbon</li>
                        <li><strong>Less reactive metals (Cu, Ag, Au):</strong> Simple heating or chemical reduction</li>
                    </ul>

                    <h3>3.7 Corrosion</h3>
                    <p>Corrosion is the gradual destruction of metals by chemical reaction with their environment.</p>
                    
                    <div class="note-example">
                        <h4>Examples:</h4>
                        <ul>
                            <li><strong>Rusting of iron:</strong> Formation of reddish-brown iron oxide</li>
                            <li><strong>Green coating on copper:</strong> Formation of copper carbonate</li>
                            <li><strong>Black coating on silver:</strong> Formation of silver sulfide</li>
                        </ul>
                    </div>

                    <h4>Prevention of Corrosion:</h4>
                    <ul>
                        <li>Painting or coating with oil/grease</li>
                        <li>Galvanization (coating with zinc)</li>
                        <li>Electroplating</li>
                        <li>Alloying</li>
                    </ul>

                    <h3>3.8 Alloys</h3>
                    <p>Alloys are homogeneous mixtures of two or more metals, or a metal and a non-metal.</p>
                    
                    <div class="note-example">
                        <h4>Common Alloys:</h4>
                        <ul>
                            <li><strong>Steel:</strong> Iron + Carbon (used in construction)</li>
                            <li><strong>Brass:</strong> Copper + Zinc (used in utensils)</li>
                            <li><strong>Bronze:</strong> Copper + Tin (used in statues)</li>
                            <li><strong>Stainless Steel:</strong> Iron + Chromium + Nickel (used in cutlery)</li>
                        </ul>
                    </div>

                    <h3>Practice Questions</h3>
                    <ol>
                        <li>Differentiate between metals and non-metals based on physical properties.</li>
                        <li>Write the chemical equations for:
                            <ul>
                                <li>Reaction of sodium with water</li>
                                <li>Reaction of zinc with sulfuric acid</li>
                            </ul>
                        </li>
                        <li>Arrange the following metals in order of reactivity: Iron, Zinc, Copper, Sodium</li>
                        <li>What is corrosion? How can it be prevented?</li>
                        <li>Name three alloys and their uses.</li>
                    </ol>

                    <h3>Key Points to Remember</h3>
                    <ul>
                        <li>Metals are lustrous, malleable, ductile, and good conductors</li>
                        <li>Non-metals are dull, brittle, and poor conductors</li>
                        <li>Reactivity series helps predict metal reactions</li>
                        <li>Corrosion can be prevented by various methods</li>
                        <li>Alloys have improved properties compared to pure metals</li>
                    </ul>
                `
            }
        ],
        math: [
            {
                id: 'n10m1',
                title: 'Chapter 1: Real Numbers',
                description: 'Euclid\'s division algorithm, fundamental theorem of arithmetic, and rational numbers',
                topics: ['Euclid\'s Algorithm', 'Prime Factorization', 'HCF and LCM', 'Rational Numbers'],
                viewLink: 'note-detail.html?id=n10m1',
                lastUpdated: '2024-01-18',
                readTime: 16,
                content: `
                    <h2>1. Real Numbers</h2>
                    
                    <h3>1.1 Introduction to Real Numbers</h3>
                    <p>Real numbers include all rational and irrational numbers. They can be represented on a number line.</p>
                    
                    <ul>
                        <li><strong>Rational Numbers:</strong> Numbers that can be expressed as p/q where p and q are integers and q ≠ 0</li>
                        <li><strong>Irrational Numbers:</strong> Numbers that cannot be expressed as p/q (e.g., √2, π, e)</li>
                    </ul>

                    <h3>1.2 Euclid's Division Lemma</h3>
                    <p>For any two positive integers a and b, there exist unique integers q and r such that:</p>
                    <p><code>a = bq + r, where 0 ≤ r < b</code></p>
                    
                    <div class="note-example">
                        <h4>Example:</h4>
                        <p>Find q and r when a = 17 and b = 5</p>
                        <p><strong>Solution:</strong></p>
                        <p>17 = 5 × 3 + 2</p>
                        <p>Here, q = 3 and r = 2</p>
                    </div>

                    <h3>1.3 Euclid's Division Algorithm</h3>
                    <p>This algorithm is used to find the HCF (Highest Common Factor) of two positive integers.</p>
                    
                    <div class="note-steps">
                        <h4>Steps:</h4>
                        <ol>
                            <li>Apply Euclid's division lemma to find q and r</li>
                            <li>If r = 0, then HCF is b</li>
                            <li>If r ≠ 0, apply the lemma to b and r</li>
                            <li>Continue until remainder becomes 0</li>
                        </ol>
                    </div>

                    <div class="note-example">
                        <h4>Example: Find HCF of 56 and 72</h4>
                        <p>72 = 56 × 1 + 16</p>
                        <p>56 = 16 × 3 + 8</p>
                        <p>16 = 8 × 2 + 0</p>
                        <p><strong>Therefore, HCF = 8</strong></p>
                    </div>

                    <h3>1.4 Fundamental Theorem of Arithmetic</h3>
                    <p>Every composite number can be expressed as a product of primes, and this factorization is unique (except for the order of factors).</p>
                    
                    <div class="note-example">
                        <h4>Example:</h4>
                        <p>Prime factorization of 60:</p>
                        <p>60 = 2 × 2 × 3 × 5 = 2² × 3 × 5</p>
                    </div>

                    <h3>1.5 HCF and LCM</h3>
                    <p><strong>Important Formula:</strong></p>
                    <p><code>HCF × LCM = Product of two numbers</code></p>
                    
                    <div class="note-example">
                        <h4>Example:</h4>
                        <p>Find LCM of 12 and 18 if HCF = 6</p>
                        <p><strong>Solution:</strong></p>
                        <p>LCM = (12 × 18) / 6 = 36</p>
                    </div>

                    <h3>1.6 Decimal Expansion of Rational Numbers</h3>
                    <p>The decimal expansion of a rational number is either:</p>
                    <ul>
                        <li><strong>Terminating:</strong> Ends after finite digits (e.g., 1/4 = 0.25)</li>
                        <li><strong>Non-terminating repeating:</strong> Continues infinitely with repeating pattern (e.g., 1/3 = 0.333...)</li>
                    </ul>

                    <h3>Practice Questions</h3>
                    <ol>
                        <li>Find the HCF of 96 and 404 using Euclid's algorithm.</li>
                        <li>Express 140 as a product of prime factors.</li>
                        <li>Find the LCM of 12, 15, and 20.</li>
                        <li>Prove that √5 is irrational.</li>
                        <li>Without actual division, determine if 987/10500 is terminating or non-terminating.</li>
                    </ol>

                    <h3>Key Points to Remember</h3>
                    <ul>
                        <li>Euclid's division lemma: a = bq + r</li>
                        <li>Every composite number has unique prime factorization</li>
                        <li>HCF × LCM = Product of numbers</li>
                        <li>Rational numbers have terminating or repeating decimals</li>
                        <li>Irrational numbers have non-terminating, non-repeating decimals</li>
                    </ul>
                `
            }
        ]
    },

    // Class 11 Notes
    '11': {
        physics: [
            {
                id: 'n11p1',
                title: 'Chapter 1: Physical World and Measurement',
                description: 'Introduction to physics, units and measurements, dimensional analysis',
                topics: ['Units', 'Dimensions', 'Errors', 'Significant Figures'],
                viewLink: 'note-detail.html?id=n11p1',
                lastUpdated: '2024-01-22',
                readTime: 20,
                content: `
                    <h2>1. Physical World and Measurement</h2>
                    
                    <h3>1.1 What is Physics?</h3>
                    <p>Physics is the study of matter, energy, and their interactions. It deals with the fundamental laws of nature and their applications.</p>

                    <h3>1.2 Units and Measurements</h3>
                    <p>Measurement is the process of comparing a physical quantity with a standard unit.</p>
                    
                    <h4>SI Units (International System of Units):</h4>
                    <ul>
                        <li><strong>Length:</strong> meter (m)</li>
                        <li><strong>Mass:</strong> kilogram (kg)</li>
                        <li><strong>Time:</strong> second (s)</li>
                        <li><strong>Temperature:</strong> kelvin (K)</li>
                        <li><strong>Electric Current:</strong> ampere (A)</li>
                        <li><strong>Amount of Substance:</strong> mole (mol)</li>
                        <li><strong>Luminous Intensity:</strong> candela (cd)</li>
                    </ul>

                    <h3>1.3 Dimensional Analysis</h3>
                    <p>Dimensions represent the physical nature of a quantity. The dimensions of fundamental quantities are:</p>
                    <ul>
                        <li>Length: [L]</li>
                        <li>Mass: [M]</li>
                        <li>Time: [T]</li>
                    </ul>

                    <div class="note-example">
                        <h4>Example: Find dimensions of Force</h4>
                        <p>Force = Mass × Acceleration</p>
                        <p>Force = M × LT⁻²</p>
                        <p><strong>[F] = [MLT⁻²]</strong></p>
                    </div>

                    <h3>1.4 Significant Figures</h3>
                    <p>Significant figures are the digits in a number that carry meaningful information about its precision.</p>
                    
                    <div class="note-steps">
                        <h4>Rules:</h4>
                        <ol>
                            <li>All non-zero digits are significant</li>
                            <li>Zeros between non-zero digits are significant</li>
                            <li>Leading zeros are not significant</li>
                            <li>Trailing zeros after decimal are significant</li>
                        </ol>
                    </div>

                    <h3>Practice Questions</h3>
                    <ol>
                        <li>Convert 72 km/h to m/s</li>
                        <li>Find the dimensions of energy</li>
                        <li>How many significant figures are in 0.00340?</li>
                        <li>Check dimensional consistency: v² = u² + 2as</li>
                    </ol>
                `
            }
        ]
    },

    // Class 12 Notes
    '12': {
        physics: [
            {
                id: 'n12p1',
                title: 'Chapter 1: Electric Charges and Fields',
                description: 'Coulomb\'s law, electric field, electric flux, and Gauss\'s law',
                topics: ['Electric Charge', 'Coulomb\'s Law', 'Electric Field', 'Gauss\'s Law'],
                viewLink: 'note-detail.html?id=n12p1',
                lastUpdated: '2024-01-28',
                readTime: 22,
                content: `
                    <h2>1. Electric Charges and Fields</h2>
                    
                    <h3>1.1 Electric Charge</h3>
                    <p>Electric charge is a fundamental property of matter that causes it to experience a force in an electromagnetic field.</p>
                    
                    <h4>Properties of Electric Charge:</h4>
                    <ul>
                        <li>Charge is quantized: q = ne (where n is an integer)</li>
                        <li>Charge is conserved</li>
                        <li>Like charges repel, unlike charges attract</li>
                        <li>SI unit: Coulomb (C)</li>
                    </ul>

                    <h3>1.2 Coulomb's Law</h3>
                    <p>The force between two point charges is directly proportional to the product of charges and inversely proportional to the square of distance between them.</p>
                    
                    <p><code>F = k(q₁q₂)/r²</code></p>
                    <p>where k = 9 × 10⁹ Nm²/C²</p>

                    <div class="note-example">
                        <h4>Example:</h4>
                        <p>Find force between two charges of 2μC and 3μC separated by 10cm</p>
                        <p><strong>Solution:</strong></p>
                        <p>F = (9×10⁹ × 2×10⁻⁶ × 3×10⁻⁶) / (0.1)²</p>
                        <p>F = 5.4 N</p>
                    </div>

                    <h3>1.3 Electric Field</h3>
                    <p>Electric field is the region around a charge where another charge experiences a force.</p>
                    <p><code>E = F/q = kQ/r²</code></p>

                    <h3>Practice Questions</h3>
                    <ol>
                        <li>State Coulomb's law</li>
                        <li>Calculate electric field at a point 5cm from a charge of 10μC</li>
                        <li>Explain the principle of superposition</li>
                    </ol>
                `
            }
        ]
    }
};

// Helper function to get note by ID
function getNoteById(noteId) {
    for (const classNum in notesDatabase) {
        for (const subject in notesDatabase[classNum]) {
            const note = notesDatabase[classNum][subject].find(n => n.id === noteId);
            if (note) {
                return {
                    ...note,
                    class: classNum,
                    subject: subject,
                    subjectName: getSubjectName(subject)
                };
            }
        }
    }
    return null;
}

// Helper function to get subject name
function getSubjectName(subject) {
    const subjectNames = {
        science: 'Science',
        math: 'Mathematics',
        english: 'English',
        nepali: 'Nepali',
        social: 'Social Studies',
        computer: 'Computer',
        physics: 'Physics',
        chemistry: 'Chemistry',
        biology: 'Biology',
        economics: 'Economics',
        accountancy: 'Accountancy'
    };
    
    return subjectNames[subject] || subject;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { notesDatabase, getNoteById };
}