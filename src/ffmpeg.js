// function generateCommand(
//   width_percent,
//   height_percent,
//   line_height_percent,
//   line_count,
//   frames_per_image,
//   lines_of_text,
//   filenames = ['foo.mp4', 'bar.mp4'],
// ) {
//   const st = (100 - height_percent) / 2 / 100;
//   const spacing = (height_percent - line_count * line_height_percent) / (line_count - 1) / 100;
//   let drawStr = '';
//   const commandArray = [];
//   for (let i = 0; i < line_count; i += 1) {
//     const w = (100 - width_percent) / 2 / 100;
//     const h = st + spacing * i;
//     drawStr += `drawtext=fontfile=/Library/Fonts/Arial.ttf:text='${lines_of_text[i]}':
//                   fontsize=24:x=w*${w}:y=h*${h}:enable=lt(n\\, ${frames_per_image})`;
//     if (i < line_count - 1) {
//       drawStr += ',';
//     }
//   }
//   filenames.forEach((name) => {
//     commandArray.push(['ffmpeg', '-i', name, drawStr]);
//   });
//   return commandArray;
// }
function build(opt) {
  const options = opt || {};

  const {
    input,
    output,
    // container,
  } = options;
  const {
    height,
    lheight,
    width,
    count,
    frame,
    text,
  } = options.filters;

  const str = [
    'ffmpeg',
    '-i', `${input}`,
  ];

  // if (options.vcodec) {
  //   const arg = ['-c:v', options.vcodec];
  //   str.push(...arg);
  // }

  // if (options.acodec) {
  //   const arg = ['-c:a', options.acodec];
  //   str.push(...arg);
  // }

  if (options.preset && options.preset !== 'none') {
    const arg = ['-preset', options.preset];
    str.push(...arg);
  }

  if (options.hardwareAccelerationOption === 'nvenc') {
    // Replace encoder with NVidia hardware accelerated encoder.
    // eslint-disable-next-line array-callback-return
    str.map((item, i) => {
      if (item === 'libx264') {
        str[i] = 'h264_nvenc';
      } else if (item === 'libx265') {
        str[i] = 'hevc_nvenc';
      }
    });
  } else if (options.hardwareAccelerationOption !== 'off') {
    const arg = ['-hwaccel', options.hardwareAccelerationOption];
    str.push(...arg);
  }

  if (options.pass === '2') {
    // TODO: Generate -pass 1 and -pass 2 command.
  }

  if (options.crf !== '0' && options.pass === 'crf') {
    const arg = ['-crf', options.crf];
    str.push(...arg);
  }

  if (options.bitrate) {
    const arg = ['-b:v', options.bitrate];
    str.push(...arg);
  }

  if (options.minrate) {
    const arg = ['-minrate', options.minrate];
    str.push(...arg);
  }

  if (options.maxrate) {
    const arg = ['-maxrate', options.maxrate];
    str.push(...arg);
  }

  if (options.bufsize) {
    const arg = ['-bufsize', options.bufsize];
    str.push(...arg);
  }

  if (options.pixelFormat && options.pixelFormat !== 'auto') {
    const arg = ['-pix_fmt', options.pixelFormat];
    str.push(...arg);
  }

  if (options.frameRate && options.frameRate !== 'auto') {
    const arg = ['-r', options.frameRate];
    str.push(...arg);
  }

  if (options.tune && options.tune !== 'none') {
    const arg = ['-tune', options.tune];
    str.push(...arg);
  }

  if (options.profile && options.profile !== 'none') {
    const arg = ['-profile:v', options.profile];
    str.push(...arg);
  }

  if (options.level && options.level !== 'none') {
    const arg = ['-level', options.level];
    str.push(...arg);
  }

  // Video Filters.
  const vf = [
    '-vf', '"',
  ];

  // if (options.speed && options.speed !== 'auto') {
  //   const arg = [`setpts=${options.speed}`];
  //   vf.push(...arg);
  // }

  const st = (100 - height) / 2 / 100;
  const spacing = (height - count * lheight) / (count - 1) / 100;
  let drawStr = '';
  for (let i = 0; i < count; i += 1) {
    const w = (100 - width) / 2 / 100;
    const h = st + spacing * i;
    drawStr += `drawtext=fontfile=/Library/Fonts/Arial.ttf:text='${text[i]}':fontsize=24:x=w*${w}:y=h*${h}:enable=lt(n\\, ${frame})`;
    if (i < count - 1) {
      drawStr += ',';
    }
  }
  // console.log(generateCommand(width, height, lheight, count, frame, ['sdf', 'sdf', 'sdaf']));
  vf.push(drawStr);
  vf.push('"'); // End of video filters.

  // Only push -vf flag if there are video filter arguments.
  if (vf.length > 3) {
    str.push(...vf);
  }

  // Extra flags.
  const extra = [
    // '-sn',
    // '-f', `${container}`,
    output,
  ];
  str.push(...extra);

  return str.join(' ');
}

export default {
  build,
};
