const { execSync } = require('child_process');

try {
  execSync('ffmpeg -i step_11.png -vf "crop=iw-36:ih-30:18:15" -q:v 2 web/assets/balcony_woman_hero.jpg -y');
  console.log('Saved balcony_woman_hero.jpg without black borders');
} catch (e) {
  console.error(e.message);
}
