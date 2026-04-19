import { Kandam, Pravachanam } from './types';
import { bala } from './kandams/bala';
import { ayodhya } from './kandams/ayodhya';
import { aranya } from './kandams/aranya';
import { kishkindha } from './kandams/kishkindha';
import { sundara } from './kandams/sundara';
import { yuddha } from './kandams/yuddha';
import { pravachanaRoopaRamayanam as prr } from './pravachanam';

export const kandams: Kandam[] = [
  bala,
  ayodhya,
  aranya,
  kishkindha,
  sundara,
  yuddha
];

export const pravachanaRoopaRamayanam: Pravachanam[] = prr;

export type { Kandam, Pravachanam, Sarga } from './types';
