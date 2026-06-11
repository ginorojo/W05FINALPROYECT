const validatePokemon = (req, res, next) => {
    const { id, name, type1, hp, attack } = req.body;
    const validTypes = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];

    if (req.method === 'POST' && (!id || !Number.isInteger(id))) return res.status(400).json({ error: true, message: "Invalid 'id'" });
    if (typeof name !== 'string' || name.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'name'" });
    if (!validTypes.includes(type1)) return res.status(400).json({ error: true, message: "Invalid 'type1'" });
    if (!Number.isInteger(hp) || hp <= 0) return res.status(400).json({ error: true, message: "Invalid 'hp'" });
    if (!Number.isInteger(attack) || attack <= 0) return res.status(400).json({ error: true, message: "Invalid 'attack'" });
    
    next();
};

const validateTrainer = (req, res, next) => {
    const { id, name, badgeCount, teamPokemonIds } = req.body;
    
    if (req.method === 'POST' && (!id || !Number.isInteger(id))) return res.status(400).json({ error: true, message: "Invalid 'id'" });
    if (typeof name !== 'string' || name.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'name'" });
    if (badgeCount !== undefined && (typeof badgeCount !== 'number' || badgeCount < 0 || badgeCount > 8)) {
        return res.status(400).json({ error: true, message: "Invalid 'badgeCount'" });
    }
    if (teamPokemonIds !== undefined && (!Array.isArray(teamPokemonIds) || teamPokemonIds.length > 6)) {
        return res.status(400).json({ error: true, message: "Invalid 'teamPokemonIds'" });
    }
    
    next();
};

const validateGym = (req, res, next) => {
    const { name, leaderName, badgeName, region } = req.body;
    
    if (typeof name !== 'string' || name.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'name'" });
    if (typeof leaderName !== 'string' || leaderName.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'leaderName'" });
    if (typeof badgeName !== 'string' || badgeName.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'badgeName'" });
    if (typeof region !== 'string' || region.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'region'" });
    
    next();
};

const validateItem = (req, res, next) => {
    const { name, category, effect, cost } = req.body;
    const validCategories = ['Pokeball', 'Potion', 'Berry', 'TM'];
    
    if (typeof name !== 'string' || name.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'name'" });
    if (!validCategories.includes(category)) return res.status(400).json({ error: true, message: "Invalid 'category'" });
    if (typeof effect !== 'string' || effect.trim() === '') return res.status(400).json({ error: true, message: "Invalid 'effect'" });
    if (cost !== undefined && (typeof cost !== 'number' || cost < 0)) return res.status(400).json({ error: true, message: "Invalid 'cost'" });
    
    next();
};

module.exports = { validatePokemon, validateTrainer, validateGym, validateItem };
