"""Publishes the static export (out/) to the Hugging Face Space.

Uses upload_folder directly rather than `hf upload`, which first tries to create
the repo and gets a 402 for Spaces on free accounts even when the Space exists.

    HF_TOKEN=... python scripts/deploy_hf_space.py [folder]
"""

import os
import sys

from huggingface_hub import HfApi

SPACE = os.environ.get("SPACE", "Elisha622/portfolio")
folder = sys.argv[1] if len(sys.argv) > 1 else "out"
sha = os.environ.get("GITHUB_SHA", "")[:7]

api = HfApi(token=os.environ.get("HF_TOKEN") or None)
commit = api.upload_folder(
    repo_id=SPACE,
    repo_type="space",
    folder_path=folder,
    path_in_repo=".",
    # Old hashed chunks would otherwise pile up; everything else is overwritten.
    delete_patterns=["_next/**"],
    commit_message=f"Deploy {sha} from GitHub Actions" if sha else "Deploy portfolio",
)
print(f"Published to https://huggingface.co/spaces/{SPACE} ({commit.oid[:7]})")
