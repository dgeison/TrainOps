#!/usr/bin/env node
/**
 * Seed / reset script para TrainOps.
 * Uso:
 *   npm run seed        -> adiciona registros exemplo mantendo existentes
 *   npm run seed:reset  -> substitui totalmente o data.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');
const args = process.argv.slice(2);
const isReset = args.includes('--reset');

function loadCurrent() {
  if (!fs.existsSync(DATA_FILE)) {
      return { instructors: [], members: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    console.error('Erro lendo data.json, usando estrutura vazia. Detalhe:', e.message);
    return { instructors: [], members: [] };
  }
}

function buildSeedBase() {
  const now = Date.now();
  return {
    instructors: [
      {
        id: 1,
        avatar_URL: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&auto=format&fit=crop&q=60',
        name: 'Instrutor Seed 1',
        birth: Date.parse('1990-05-10'),
        gender: 'M',
        services: 'Musculação, Crossfit',
        created_at: now - 86400000
      },
      {
        id: 2,
        avatar_URL: 'https://images.unsplash.com/photo-1599058917212-d750089bc07d?w=400&auto=format&fit=crop&q=60',
        name: 'Instrutora Seed 2',
        birth: Date.parse('1988-11-22'),
        gender: 'F',
        services: 'Pilates, Yoga',
        created_at: now - 43200000
      }
    ],
    members: [
      {
        id: 1,
        avatar_URL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60',
        name: 'Membro Seed 1',
        email: 'seed1@example.com',
        birth: Date.parse('2000-01-15'),
        gender: 'M',
        blood: 'O+',
        weight: '80',
        height: '180'
      },
      {
        id: 2,
        avatar_URL: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=60',
        name: 'Membra Seed 2',
        email: 'seed2@example.com',
        birth: Date.parse('1999-07-30'),
        gender: 'F',
        blood: 'A+',
        weight: '60',
        height: '165'
      }
    ]
  };
}

function mergeSeeds(current, base) {
  // Ajusta IDs para não colidir
  const lastInstructor = current.instructors[current.instructors.length - 1];
  const baseInstructorOffset = lastInstructor ? lastInstructor.id : 0;
  const instructors = current.instructors.concat(
    base.instructors.map((ins, i) => ({ ...ins, id: baseInstructorOffset + i + 1 }))
  );

  const lastMember = current.members[current.members.length - 1];
  const baseMemberOffset = lastMember ? lastMember.id : 0;
  const members = current.members.concat(
    base.members.map((mem, i) => ({ ...mem, id: baseMemberOffset + i + 1 }))
  );

  return { instructors, members };
}

function main() {
  const current = loadCurrent();
  const base = buildSeedBase();
  const finalData = isReset ? base : mergeSeeds(current, base);

  fs.writeFileSync(DATA_FILE, JSON.stringify(finalData, null, 2));
  console.log(`Seed concluído. Modo: ${isReset ? 'RESET (substituição completa)' : 'APPEND (acréscimo)'}\nArquivo: ${DATA_FILE}`);
  console.log(`Total instructors: ${finalData.instructors.length}`);
  console.log(`Total members: ${finalData.members.length}`);
}

main();
