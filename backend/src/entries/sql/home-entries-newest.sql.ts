export const homeEntiresNewestQuery = (
  offset: string,
) => `SELECT "entry"."id" AS "id",
"entry"."createdAt" AS "createdAt",
"entry"."updatedAt" AS "updatedAt",
"entry"."url" AS "url",
"entry"."slug" AS "slug",
"entry"."title" AS "title",
"entry"."publisher" AS "publisher",
"entry"."description" AS "description",
"entry"."body" AS "body",
"entry"."type" AS "type",
"entry"."deleted" AS "deleted",
"entry"."authorId" AS "authorId",
"entry"."roomId" AS "roomId",
"entry"."linkId" AS "linkId",
"entry"."photoId" AS "photoId",
"author"."id" AS "author.id",
"author"."createdAt" AS "author.createdAt",
"author"."updatedAt" AS "author.updatedAt",
"author"."displayName" AS "author.displayName",
"author"."color" AS "author.color",
"author"."email" AS "author.email",
"author"."authProvider" AS "author.authProvider",
"author"."authId" AS "author.authId",
"author"."isAdmin" AS "author.isAdmin",
"author"."isBanned" AS "author.isBanned",
"author"."isModerator" AS "author.isModerator",
"photo"."id" AS "photo.id",
"photo"."createdAt" AS "photo.createdAt",
"photo"."updatedAt" AS "photo.updatedAt",
"photo"."name" AS "photo.name",
"photo"."url" AS "photo.url",
"photo"."userId" AS "photo.userId",
"room"."id" AS "room.id",
"room"."createdAt" AS "room.createdAt",
"room"."updatedAt" AS "room.updatedAt",
"room"."name" AS "room.name",
"room"."description" AS "room.description",
"room"."authorId" AS "room.authorId",
"room"."photoId" AS "room.photoId",
COUNT(DISTINCT("comments"."id")) AS "commentsNumber",
(
  SELECT COALESCE(SUM(value), 0)
  FROM "vote" "vote"
  WHERE "vote"."entryId" = "entry"."id"
) AS "voteScore",
(
  SELECT value
  FROM "vote" "vote"
  WHERE "vote"."entryId" = "entry"."id"
    AND "vote"."userId" = $1
) AS "userVote"
FROM (
  SELECT DISTINCT ON (coalesce("entry"."linkId", random())) *
  FROM "entry" "entry"
  WHERE ("entry"."deleted" = false)
  ${offset}
  ORDER BY coalesce("entry"."linkId", random()) desc, "entry"."createdAt" asc
) AS "entry"
LEFT JOIN "comment" "comments" ON "comments"."entryId" = "entry"."id"
LEFT JOIN "user" "author" ON "author"."id" = "entry"."authorId"
LEFT JOIN "photo" "photo" ON "photo"."id" = "entry"."photoId"
LEFT JOIN "room" "room" ON "room"."id" = "entry"."roomId"
WHERE ("entry"."deleted" = false)
${offset}
GROUP BY "entry"."id",
"entry"."createdAt",
"entry"."updatedAt",
"entry"."url",
"entry"."slug",
"entry"."title",
"entry"."publisher",
"entry"."description",
"entry"."body",
"entry"."type",
"entry"."deleted",
"entry"."authorId",
"entry"."roomId",
"entry"."linkId",
"entry"."photoId",
"author"."id",
"author"."createdAt",
"author"."updatedAt",
"author"."displayName",
"author"."email",
"author"."authProvider",
"author"."authId",
"author"."isAdmin",
"author"."isModerator",
"photo"."id",
"photo"."createdAt",
"photo"."updatedAt",
"photo"."name",
"photo"."url",
"photo"."userId",
"room"."id",
"room"."createdAt",
"room"."updatedAt",
"room"."name",
"room"."description",
"room"."authorId",
"room"."photoId"
ORDER BY "entry"."createdAt" desc
LIMIT $2`;
