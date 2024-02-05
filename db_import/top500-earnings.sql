SELECT p.id, p.tag, p.name, p.romanized_name, p.birthday, p.country, p.race, FLOOR((r.rating + 1.0)*1000) as rating, r.position, e.sum_earnings
FROM public.player AS p JOIN public.rating AS r ON r.id = p.current_rating_id
INNER JOIN (
	SELECT earn.player_id, SUM(earnings) AS sum_earnings
	FROM public.earnings earn
	GROUP BY earn.player_id
) e ON e.player_id = p.id
WHERE p.id <> 23496 -- we don't want Reynor as race switcher
ORDER BY e.sum_earnings DESC LIMIT 500
