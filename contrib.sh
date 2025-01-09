# Loop through users
for user in $(git log --pretty="%ce%n" | sort | uniq);
do
   # print user email
   echo "$user"
   # print total files changed, total insertions, total deletions
   echo $(git log --author="${user}" --shortstat 'main' | awk '/^ [0-9]/ { f += $1; i += $4; d += $6 } END { printf("%d files changed, %d insertions(+), %d deletions(-)", f, i, d) }')
done
