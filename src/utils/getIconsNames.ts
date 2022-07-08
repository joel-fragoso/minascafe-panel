import {
  findIconDefinition,
  IconLookup,
  IconName,
} from '@fortawesome/fontawesome-svg-core';

export default function isIconName(name: string | undefined): name is IconName {
  return (
    findIconDefinition({ prefix: 'fas', iconName: name } as IconLookup) !==
    undefined
  );
}
