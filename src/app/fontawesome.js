// fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';

// Prevent automatic CSS addition in Next.js
config.autoAddCss = false;

// Add the icons you need (you can add specific ones or entire packs)
library.add(fas);
