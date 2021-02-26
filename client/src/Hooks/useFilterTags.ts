import { useState } from 'react';

interface useFilterTagsReturnValue {
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  clearSelected: () => void;
  showItem: (itemTags: string[]) => boolean;
}

export default function useFilterTags(): useFilterTagsReturnValue {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onTagClick = (tag: string): void => {
    // add tag to selectedTags if it's not there, or remove it if it's there
    let newSelectedTags: string[];
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag,
      );
    } else {
      newSelectedTags = [...selectedTags];
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  const clearSelected = () => {
    setSelectedTags([]);
  };

  const showItem = (itemTags: string[]) => {
    // show the item if there are no tags selected,
    // or the item includes all selected tags
    if (selectedTags.length === 0) return true;

    return selectedTags.every((tag) => itemTags.includes(tag));
  };

  return { selectedTags, onTagClick, clearSelected, showItem };
}
