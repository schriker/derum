import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AppAbility } from './abilityTypes';

export const AbilityContext = createContext<AppAbility | null>(null);
export const Can = createContextualCan(AbilityContext.Consumer);
