"""Template-reference inventories and render-time metadata."""

import copy


def merge_profile(inventory, profile):
    """Attach profile aliases without changing the cached grammar payload."""
    reference = copy.deepcopy(inventory)
    profile = copy.deepcopy(profile or {})
    reference["profile"] = profile
    reference["profile_aliases"] = sorted(
        (
            {"alias": alias, "type_name": type_name}
            for type_name, alias in (profile.get("bucket_aliases") or {}).items()
        ),
        key=lambda item: (item["alias"], item["type_name"]),
    )
    reference["root_alias"] = profile.get("root_alias")
    reference["title_fields"] = copy.deepcopy(profile.get("title_fields") or {})
    return reference
