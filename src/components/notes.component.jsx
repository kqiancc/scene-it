import { useState, useEffect } from 'react';

const Notes = ({ episodeData, onTagsChange, onNotesChange }) => {
  const [userInput, setUserInput] = useState('');
  const [tags, setTags] = useState([]);
  const [userNotes, setUserNotes] = useState('');

  useEffect(() => {
    if (episodeData) {
      setUserInput('');
      setTags(episodeData.tags);
      setUserNotes(episodeData.notes.join('\n'));
    }
  }, [episodeData]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleNotesInputChange = (event) => {
    setUserNotes(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newTags = userInput.split(',').map((tag) => tag.trim());
      setTags((prevTags) => [...prevTags, ...newTags]);
      onTagsChange([...tags, ...newTags]);
      setUserInput('');
    }
  };

  const handleNotesKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newNotes = userNotes.split('\n').map((note) => note.trim());
      onNotesChange(newNotes);
      setUserNotes('');
    }
  };

  return (
    <div>
      <div className="grid h-10 card base-200 rounded-box place-items-left">
        <div className="place-items-center">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder="Personal tags"
            className="input input-bordered input-info w-full max-w-xs"
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div className="tag-container flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <div key={index} className="badge badge-secondary mx-1">
              {tag}
            </div>
          ))}
        </div>
      )}

      <div className="divider"></div>

      <div className="grid h-10 card bg-base-100 rounded-box place-items-left">
        <div className="place-items-center">
          <input
            type="text"
            value={userNotes}
            onChange={handleNotesInputChange}
            onKeyPress={handleNotesKeyPress}
            placeholder="Personal notes"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
      </div>

      {userNotes && (
        <div className="tag-container flex flex-wrap mt-2">
          {userNotes.split('\n').map((note, index) => (
            <div key={index} className="badge badge-secondary mx-1">
              {note.trim()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
