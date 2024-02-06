BEGIN;

-- fix two Rain
UPDATE public.player
SET tag = 'Rain (P)'
WHERE player.id = 7;

UPDATE public.player
SET tag = 'Rain (T)'
WHERE player.id = 104;

-- fix two Happy
UPDATE public.player
SET tag = 'Happy (RU)'
WHERE player.id = 95;

UPDATE public.player
SET tag = 'Happy (KR)'
WHERE player.id = 40;

-- fix two Check
UPDATE public.player
SET tag = 'Check (1993)'
WHERE player.id = 1663;

UPDATE public.player
SET tag = 'Check (1986)'
WHERE player.id = 166;

-- fix two Bunny
UPDATE public.player
SET tag = 'Bunny (KR)'
WHERE player.id = 1517;

UPDATE public.player
SET tag = 'Bunny (DK)'
WHERE player.id = 1813;


-- fix MaxPax birthday (2004-07)
-- https://liquipedia.net/starcraft2/MaxPax
UPDATE public.player
SET birthday = '2004-07-01'
WHERE player.id = 19591;

-- fix NightMare birthday
-- https://liquipedia.net/starcraft2/NightMare
UPDATE public.player
SET birthday = '1999-02-23'
WHERE player.id = 8148;

-- fix Denver birthday
-- https://liquipedia.net/starcraft2/Denver
UPDATE public.player
SET birthday = '1997-04-10'
WHERE player.id = 4564;

-- fix Prince birthday (1993)
-- https://namu.wiki/w/%EC%B5%9C%EB%AF%BC%EC%9A%B0(%ED%94%84%EB%A1%9C%EA%B2%8C%EC%9D%B4%EB%A8%B8)
UPDATE public.player
SET birthday = '1993-01-01'
WHERE player.id = 13719;

-- fix Silky birthday (1996-09)
-- https://liquipedia.net/starcraft2/Silky_(American_player)
UPDATE public.player
SET birthday = '1996-09-01'
WHERE player.id = 6058;

-- fix Nice birthday
-- https://liquipedia.net/starcraft2/Nice
UPDATE public.player
SET birthday = '1999-05-15'
WHERE player.id = 8106;

-- fix Percival birthday
-- https://liquipedia.net/starcraft2/Percival
UPDATE public.player
SET birthday = '2002-03-28'
WHERE player.id = 19468;

-- todo: ask
-- fix DisK birthday (age 26 - 2024-01-28, possible out of date)
-- https://www.twitch.tv/disksc2/about
UPDATE public.player
SET birthday = '1997-01-01'
WHERE player.id = 9314;

-- todo: 0815?
-- fix Spatz birthday
-- https://liquipedia.net/starcraft2/Spatz
UPDATE public.player
SET birthday = '2000-08-15'
WHERE player.id = 13713;

-- fix Seither birthday
-- https://liquipedia.net/starcraft2/Seither
UPDATE public.player
SET birthday = '1994-06-29'
WHERE player.id = 9990;

-- fix JonSnow birthday
-- https://liquipedia.net/starcraft2/JonSnow
UPDATE public.player
SET birthday = '1997-01-13'
WHERE player.id = 4388;

-- fix Semper birthday
-- https://liquipedia.net/starcraft2/Semper
UPDATE public.player
SET birthday = '1995-09-06'
WHERE player.id = 5118;

-- fix RiSky birthday
-- https://liquipedia.net/starcraft2/RiSky
UPDATE public.player
SET birthday = '1996-02-27'
WHERE player.id = 2453;

COMMIT;
