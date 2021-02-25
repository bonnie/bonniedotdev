import Chip from '@material-ui/core/Chip';
import React, { ReactElement } from 'react';

interface FilterChipsProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export default function FilterChips({
  tags,
  selectedTags,
  onTagClick,
}: FilterChipsProps): ReactElement {
  const filterChips = tags.map((tag) => {
    const selected = selectedTags.includes(tag);
    return (
      <Chip
        style={{ margin: 3 }}
        key={tag}
        size="small"
        color={selected ? 'secondary' : 'default'}
        onClick={() => onTagClick(tag)}
        label={tag}
        title={
          selected
            ? 'click to stop filtering by this tag'
            : 'click to filter by this tag'
        }
      />
    );
  });

  return <>{filterChips}</>;
}
