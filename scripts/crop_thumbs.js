const { execSync } = require('child_process');

try {
  execSync('ffmpeg -i step_11.png -q:v 2 web/assets/balcony_woman_hero.jpg -y');
  execSync('ffmpeg -i figma_frame_explore.png -vf "crop=110:72:234:586" -q:v 2 web/assets/figma_thumb_1.jpg -y');
  execSync('ffmpeg -i figma_frame_explore.png -vf "crop=110:72:364:586" -q:v 2 web/assets/figma_thumb_2.jpg -y');
  execSync('ffmpeg -i figma_frame_explore.png -vf "crop=110:72:494:586" -q:v 2 web/assets/figma_thumb_3.jpg -y');
  execSync('ffmpeg -i figma_frame_explore.png -vf "crop=110:72:624:586" -q:v 2 web/assets/figma_thumb_4.jpg -y');
  execSync('ffmpeg -i figma_frame_explore.png -vf "crop=110:72:754:586" -q:v 2 web/assets/figma_thumb_5.jpg -y');
  console.log('Successfully cropped!');
} catch (e) {
  console.error(e.message);
}
