// Sampled from the alpha channel of public/assets/palm-column-left.webp: 201
// evenly-spaced rows (t = i/200, 0 = top, 1 = bottom) of the fraction of the
// image's width where the tree's foliage ends. Each sample is the max alpha
// extent over a +/-1.5% window of image height (then a 3-point rolling max),
// so thin fronds between samples don't get missed — this is a safety
// envelope, not the exact silhouette. Regenerate from the source webp if the
// asset changes.
export const PALM_RIGHT_FRAC_SAMPLES: number[] = [
  0.4692, 0.8299, 0.8299, 0.8299, 0.8299, 0.8299, 0.8299, 0.8299, 0.8299,
  0.8265, 0.8094, 0.8025, 0.7854, 0.7637, 0.7523, 0.7306, 0.8242, 0.8242,
  0.8242, 0.8242, 0.8242, 0.8242, 0.8242, 0.8242, 0.8242, 0.8082, 0.8002,
  0.7854, 0.7717, 0.8322, 0.8756, 0.8756, 0.8756, 0.8756, 0.8756, 0.8756,
  0.8756, 0.8756, 0.8687, 0.8619, 0.8493, 0.8174, 0.8699, 0.9201, 0.9452,
  0.9703, 0.9886, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9783, 0.9783, 0.5468, 0.4635,
  0.4258, 0.4258, 0.4258, 0.4258, 0.4247, 0.4247, 0.4258, 0.4326, 0.4349,
  0.4349, 0.4361, 0.4361, 0.4361, 0.4361, 0.4361, 0.4361, 0.4361, 0.4361,
  0.3562, 0.3562, 0.3562, 0.3584, 0.3584, 0.3584, 0.3584, 0.3584, 0.3584,
  0.3584, 0.3584, 0.3493, 0.3493, 0.3493, 0.3493, 0.347, 0.3436, 0.3413,
  0.3379, 0.3345, 0.3311, 0.3276, 0.3265, 0.3265, 0.3813, 0.3813, 0.3813,
  0.3813, 0.3813, 0.3813, 0.3813, 0.3813, 0.3801, 0.3721, 0.363, 0.3596,
  0.3596, 0.3927, 0.4292, 0.4304, 0.4304, 0.4304, 0.4304, 0.4304, 0.4304,
  0.4304, 0.4304, 0.3893, 0.3687, 0.3687, 0.3687, 0.3756, 0.3881, 0.3938,
  0.3938, 0.5982, 0.5982, 0.5982, 0.5982, 0.5982, 0.5982, 0.5982, 0.5982,
  0.5479, 0.5537, 0.5537, 0.5559, 0.5559, 0.5559, 0.5559, 0.5559, 0.5559,
  0.5559, 0.6781, 0.6815, 0.6815, 0.6815, 0.6815, 0.6815, 0.6815, 0.8961,
  0.8995, 0.8995, 0.9075, 0.9087, 0.9087, 0.9087, 0.9087, 0.9087, 0.9087,
  0.9087, 0.9087, 0.903, 0.8847, 0.8847, 0.8756, 0.8505, 0.8288, 0.8196,
  0.782, 0.7808, 0.7511, 0.7363, 0.7192, 0.6986, 0.6998, 0.6998, 0.6998,
  0.6998, 0.6998, 0.6998, 0.6998, 0.6998, 0.6884, 0.6632, 0.6473, 0.6473,
  0.6473, 0.6473, 0.6473, 0.6473, 0.6473, 0.6473,
];

// Natural aspect ratio (width / height) of palm-column-left.webp.
export const PALM_ASPECT_RATIO = 876 / 2560;

function interpolateRightFrac(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  const samples = PALM_RIGHT_FRAC_SAMPLES;
  const lastIndex = samples.length - 1;
  const position = clamped * lastIndex;
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.min(lastIndex, lowerIndex + 1);
  const ratio = position - lowerIndex;
  return (
    samples[lowerIndex] + (samples[upperIndex] - samples[lowerIndex]) * ratio
  );
}

/**
 * The tree image is rendered at `height: 100%` (so its displayed height
 * equals `viewportHeight`, and image-row-fraction maps 1:1 to
 * viewport-y-fraction), anchored to the left edge and shifted by
 * `translateXPx` (a negative value pushes it further off-screen).
 *
 * Returns the tree's rightmost visible pixel, in viewport x-coordinates, at
 * viewport-relative vertical position `y`.
 */
export function getPalmRightEdgePx(
  viewportHeightPx: number,
  translateXPx: number,
  y: number,
): number {
  const displayedWidthPx = viewportHeightPx * PALM_ASPECT_RATIO;
  const rightFrac = interpolateRightFrac(y / viewportHeightPx);
  return translateXPx + rightFrac * displayedWidthPx;
}
