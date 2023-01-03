# test.sh
# sh test.sh 2022-01-01 2023-01-01
start=$1
end=$2
author="$(git config --get user.name)"

echo "开始日期: ${start}"
echo "结束日期: ${end}"
echo "git user: ${author}"

git log --since="${start}" --before="${end}" --author="$(git config --get user.name)" --pretty=tformat: --numstat | awk '{ add += $1 ; subs += $2 ; loc1 += $1 - $2 ;loc2 += $1 + $2 } END { printf "新增: %s，删除: %s，净增: %s，总计修改: %s\n",add,subs,loc1,loc2 }'