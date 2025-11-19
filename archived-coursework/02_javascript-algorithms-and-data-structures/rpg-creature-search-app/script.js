const url = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const showData = data => {
  const getStat = (name) => data.stats.find(s => s.name === name)?.base_stat || 0;

  creatureName.textContent = data.name.toUpperCase();
  creatureId.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  // Clear types
  types.innerHTML = "";
  data.types.forEach(t => {
    const typeDiv = document.createElement("div");
    typeDiv.textContent = t.name.toUpperCase();
    types.appendChild(typeDiv);
  });

  hp.textContent = `${getStat("hp")}`;
  attack.textContent = `${getStat("attack")}`;
  defense.textContent = `${getStat("defense")}`;
  specialAttack.textContent = `${getStat("special-attack")}`;
  specialDefense.textContent = `${getStat("special-defense")}`;
  speed.textContent = `${getStat("speed")}`;
};

const fetchAllData = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
  } catch (err) {
    console.log(err);
  }
};

const fetchCreatureData = async (nameOrId) => {
  try {
    const res = await fetch(creatureUrl + nameOrId);
    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!data || !data.name) throw new Error();
    showData(data);
  } catch (err) {
    alert("Creature not found");
    // Optionally clear UI here if needed
  }
};

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    fetchCreatureData(query);
  }
});

// fetchAllData();
// fetchCreatureData(1);