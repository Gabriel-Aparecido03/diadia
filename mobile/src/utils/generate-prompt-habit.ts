interface IGeneratePromptHabit {
  possibleHabits: never[]
  completedHabits: never[]
}

export function generatePromptHabit({ completedHabits, possibleHabits }: IGeneratePromptHabit) {
  return ` Tenho esses habitos para hoje ${possibleHabits.map( i => i.name )},porém so completei ${completedHabits.map( i => i.name )},como posso melhorar minha rotina ?`
}