import { useState, useEffect } from 'react';

const Notes = ({ episodeData, onTagsChange, onNotesChange }) => {
  const [userInput, setUserInput] = useState('');
  const [tags, setTags] = useState([]);
  const [userNotes, setUserNotes] = useState('');
  const [notesDisplay, setNotesDisplay] = useState([]);

  useEffect(() => {
    if (episodeData) {
      setUserInput('');
      setTags(episodeData.tags);
      setUserNotes(episodeData.notes.join('\n'));
      setNotesDisplay(episodeData.notes);
    }
  }, [episodeData]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newTags = userInput.split(',').map((tag) => tag.trim());
      setTags((prevTags) => [...prevTags, ...newTags]);
      onTagsChange([...tags, ...newTags]);
      setUserInput('');
    }
  };

  const handleNotesInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length < 300) {
      setUserNotes(inputValue);
    }
  };

  const handleNotesKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const newNotes = userNotes.split('\n').map((note) => note.trim());

      if (newNotes.length > 0) {
        onNotesChange(newNotes);
        setNotesDisplay((prevNotes) => [...prevNotes, ...newNotes]);
        setUserNotes('');
      }
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

      <div className="grid card bg-base-100 rounded-box place-items-left">
        <div className="place-items-center">
          <input
            type="text"
            value={userNotes}
            onChange={handleNotesInputChange}
            onKeyPress={handleNotesKeyPress}
            placeholder="Personal notes"
            className="input input-bordered input-primary w-full max-w-xs"
            style={{ overflowWrap: 'break-word', minHeight: '40px' }}
          />
          <div className="text-xs mt-1 text-gray-600">
            {userNotes.length} / 300 characters
          </div>
          
        </div>
      </div>

      {notesDisplay.length > 0 && (
        <div className={`tag-container mt-2 ${notesDisplay.length > 1 ? 'flex-wrap' : ''}`}>
          {notesDisplay.map((note, index) => (
            <div key={index} className="badge badge-secondary mx-1">
              {note}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;