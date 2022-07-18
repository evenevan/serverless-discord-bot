import { type ENV } from '../@types/env';
import { Autocomplete } from '../structures/Autocomplete';
import { TestAutoComplete } from './test';

export const autocompletes = [
    TestAutoComplete,
] as ((new (env: ENV) => Autocomplete))[];