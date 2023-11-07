import resolveConfig from 'tailwindcss/resolveConfig';
import myConfig from '../../../tailwind.config';

const config = resolveConfig(myConfig);

export { config };

export const getWidthValue = (width: string) => {
  if (width.startsWith('[')) {
    const widthValue = width.replace('[', '').replace(']', '');
    return widthValue;
  }
  return config.theme.width[width];
};
