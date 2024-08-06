type Options = 'option1' | 'option2' | 'option3'

type RemoveOption<T, K> = T extends K ? never : T

type RemainingOptions = RemoveOption<Options, 'option2'>
// RemainingOptions is "option1" | "option3"
