import json
import re
from pathlib import Path


RAW_FILE = Path("raw.txt")
OUT_FILE = Path("workouts2.json")

# 你给出的规则里，明确属于腹部的项目。
# 这里我额外把“腹部”也放进 abs，因为你示例 2 里是这么写的。
ABS_KEYWORDS = {"腹部", "上腹", "侧腹", "整体", "下腹"}

# 这些内容要忽略，不写入 muscles/abs/raw
IGNORE_PATTERNS = [
    re.compile(r"^第\d+次$"),
]

DATE_RE = re.compile(r"^(\d{2})\.(\d{2})\.(\d{2})(.*)$")
CARDIO_RE = re.compile(r"^有氧爬坡(\d+)分钟$")


def normalize_token(token: str) -> str:
    """清理 token 两端空白。"""
    return token.strip()


def parse_line(line: str):
    """
    解析一行 raw 记录，返回一个 dict。
    支持格式示例：
      24.12.07 第1次
      24.12.28 第10次 大腿 胸 腹部
      25.03.01 第25次 大腿（未全部完成）
      25.12.07 胸 肱三 有氧爬坡30分钟
      26.01.10（拉伸）
    """
    line = line.strip()
    if not line:
        return None

    m = DATE_RE.match(line)
    if not m:
        return {
            "raw": line,
        }

    yy, mm, dd, rest = m.groups()
    year = f"20{yy}"
    date = f"{year}-{mm}-{dd}"

    result = {"date": date}
    muscles = []
    abs_parts = []
    raw_notes = []
    cardio = None
    relax = False

    # 把日期后面的内容切成 token
    # 例如： " 第10次 大腿 胸 腹部" -> ["第10次", "大腿", "胸", "腹部"]
    # 对于像 "（拉伸）" 这种没有空格的情况，也能保留下来
    tokens = [normalize_token(t) for t in rest.split() if normalize_token(t)]

    # 如果日期后面没有空格，但直接跟了备注，比如： 26.01.10（拉伸）
    # 这里把 rest 再整体检查一次
    if not tokens and rest.strip():
        tokens = [rest.strip()]

    for token in tokens:
        # 忽略“第X次”
        if any(p.match(token) for p in IGNORE_PATTERNS):
            continue

        # 拉伸课
        if token == "（拉伸）" or token == "(拉伸)":
            relax = True
            continue

        # 有氧爬坡xx分钟
        cardio_match = CARDIO_RE.match(token)
        if cardio_match:
            cardio = int(cardio_match.group(1))
            continue

        # 备注：中文括号内容，如（未全部完成）
        if re.fullmatch(r"（.*?）", token) or re.fullmatch(r"\(.*?\)", token):
            raw_notes.append(token)
            continue

        # 腹部相关
        if token in ABS_KEYWORDS:
            abs_parts.append(token)
            continue

        # 其他都按 muscles 处理
        muscles.append(token)

    result["muscles"] = muscles
    if abs_parts:
        result["abs"] = abs_parts
    else:
        result["abs"] = []

    if cardio is not None:
        result["cardio"] = cardio

    if relax:
        result["relax"] = True

    if raw_notes:
        # 只保留备注文本
        if len(raw_notes) == 1:
            result["raw"] = raw_notes[0]
        else:
            result["raw"] = " ".join(raw_notes)

    return result


def main():
    if not RAW_FILE.exists():
        raise FileNotFoundError(f"找不到 {RAW_FILE.resolve()}")

    workouts = []
    with RAW_FILE.open("r", encoding="utf-8") as f:
        for line in f:
            item = parse_line(line)
            if item is not None:
                workouts.append(item)

    with OUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(workouts, f, ensure_ascii=False, indent=2)

    print(f"已生成 {OUT_FILE.resolve()}")


if __name__ == "__main__":
    main()