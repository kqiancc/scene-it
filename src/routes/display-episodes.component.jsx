import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Notes from '../components/notes.component';
import Heart from '../components/heart';
import {
	toggleEpFav,
	deleteTagFromEpisode,
	getEpisode,
} from '../firebase/firebase';
import Spinner from '../firebase/spinner';

const DisplayEpisodes = ({ user }) => {
	console.log('USER IDIDJI', user);
	const location = useLocation();
	const show = location.state?.show || null;
	const seasonNumber = location.state?.seasonNumber || null;

	const [episodes, setEpisodes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [allTags, setAllTags] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

	const FAVORITES_TAG = 'SHOW_FAVORITED';

	useEffect(() => {
		const fetchEpisodes = async () => {
			try {
				const apiKey = '1b2efb1dfa6123bdd9569b0959c0da25';
				const response = await fetch(
					`https://api.themoviedb.org/3/tv/${show.id}/season/${seasonNumber}?api_key=${apiKey}&language=en-US`
				);
				const data = await response.json();
          console.log(data)
				if (data.episodes) {
					const episodesWithUserData = await Promise.all(
						data.episodes.map(async (episode) => {
							const userEpisodeData = await getEpisode(episode.id);
							console.log(episode.episode_tags);
							return {
								...episode,
								isHeartClicked: userEpisodeData?.is_heart_clicked || false,
								tags: userEpisodeData?.episode_tags || [],
								notes: userEpisodeData?.episode_notes || [],
							};
						})
					);

					// Gather tags associated with the episodes
					const allEpisodeTags = episodesWithUserData.reduce((acc, episode) => {
						return acc.concat(episode.tags);
					}, []);
					// Extract unique tags
					const uniqueTags = [...new Set(allEpisodeTags)];

					setEpisodes(episodesWithUserData);

					if (user) {
						setAllTags(uniqueTags);
					}

					setLoading(false);
				} else {
					setError('Episodes data not found.');
					setLoading(false);
				}
			} catch (error) {
				setError('Error fetching data.');
				setLoading(false);
			}
		};

		if (show) {
			fetchEpisodes();
		} else {
			setLoading(false);
		}
	}, [show, seasonNumber, user]);

	const handleTagsChange = (episodeId, newTags) => {
		setEpisodes((prevEpisodes) =>
			prevEpisodes.map((episode) =>
				episode.id === episodeId
					? {
							...episode,
							tags: [...new Set([...episode.tags, ...newTags])], // Use a Set to remove duplicates
					  }
					: episode
			)
		);
	};

	const handleTagDelete = (episodeId, tagToDelete) => {
		console.log('this worky', episodeId, tagToDelete);
		setEpisodes((prevEpisodes) =>
			prevEpisodes.map((episode) =>
				episode.id === episodeId
					? {
							...episode,
							tags: episode.tags.filter((tag) => tag !== tagToDelete),
					  }
					: episode
			)
		);
		deleteTagFromEpisode(episodeId, tagToDelete);
	};

	const handleNotesChange = (episodeId, newNotes) => {
		setEpisodes((prevEpisodes) =>
			prevEpisodes.map((episode) =>
				episode.id === episodeId ? { ...episode, notes: newNotes } : episode
			)
		);
	};

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const handleHeartClick = (episodeId) => {
		setEpisodes((prevEpisodes) =>
			prevEpisodes.map((episode) => {
				if (episode.id === episodeId) {
					const newHeartState = !episode.isHeartClicked;
					toggleEpFav(
						show.id,
						seasonNumber,
						episode.id,
						show.name,
						episode.episode_number,
						newHeartState
					);
					return { ...episode, isHeartClicked: newHeartState };
				}
				return episode;
			})
		);
	};

	const handleTagClick = (tag) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
		} else {
			setSelectedTags((prevTags) => [...prevTags, tag]);
		}
	};

	const clearFilter = () => {
		setSelectedTags([]);
		setSearchQuery('');
	};

	const toggleFavoritesFilter = () => {
		setShowFavoritesOnly((prev) => !prev);
	};

	const filteredEpisodes = episodes.filter(
		(episode) =>
			(showFavoritesOnly ? episode.isHeartClicked : true) &&
			selectedTags.every((tag) =>
				tag === FAVORITES_TAG
					? episode.isHeartClicked
					: episode.tags.includes(tag)
			)
	);

	return (
		<div className="grid grid-cols-[1fr,5fr] gap-4 h-full">
			<div className="sticky top-0 h-screen col-span-1 overflow-y-auto rounded-xl bg-base-200">
				<div className="p-2">
					<h1 className="mb-4 text-xl font-bold text-center">Filters</h1>
					<div className="mt-2 border collapse collapse-plus">
						<input
							type="checkbox"
							checked={showFavoritesOnly}
							onChange={toggleFavoritesFilter}
						/>
						<div className="text-xl font-medium collapse-title">
							Display Favorited Only
						</div>
					</div>

					<div class="collapse collapse-plus border">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">Filter Tags</div>
						<div class="collapse-content">
							<div class="form-control w-full max-w-xs">
								<input
									type="text"
									placeholder="Search Tags"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full max-w-xs focus:outline-none input input-bordered bg-base-200"
								/>
								<label class="label">
									<button
										onClick={clearFilter}
										className="text-sm label-text-alt"
									>
										Clear Filters
									</button>
								</label>
							</div>
							<ul className="">
								{/* Add onClick event to each tag */}
								{allTags.length === 0 ? (
									<div className="text-lg text-center">
										No tags to filter by
									</div>
								) : (
									allTags
										.sort((a, b) => a.localeCompare(b))
										.filter((tag) =>
											tag.toLowerCase().includes(searchQuery.toLowerCase())
										)
										.map((tag, index) => (
											<button
												key={index}
												className={`mb-2 mr-2 badge badge-lg badge-secondary ${
													selectedTags.includes(tag)
														? 'ring-2 ring-primary'
														: ''
												}`}
												onClick={() => {
													// Check if the tag is already in the selectedTags array
													if (selectedTags.includes(tag)) {
														setSelectedTags((prevTags) =>
															prevTags.filter((t) => t !== tag)
														); // Remove the tag
													} else {
														setSelectedTags((prevTags) => [...prevTags, tag]); // Add the tag
													}
													handleTagClick(tag);
												}}
											>
												{tag}
											</button>
										))
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<h1 className="p-5 text-5xl font-bold h-28"> Season {seasonNumber} </h1>
				<div className="flex flex-col items-center"></div>
        {filteredEpisodes.length === 0 ? (
      <div className="mt-4 text-xl">
        No favorited episodes found with selected filters
      </div>
    ) : (
				filteredEpisodes.map((episode) => (
					<div
						className="w-9/12 collapse collapse-plus bg-base-200"
						key={episode.id}
					>
						<input
							type="checkbox"
							className="flex flex-row items-center my-accordion-3"
						/>
						<div className="flex items-center text-xl collapse-title">
							<figure className="flex-shrink-0 float-left m-4">
								{episode.still_path ? (
									<img
										className="rounded-lg"
										src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
										alt={`Episode ${episode.episode_number} - ${episode.name}`}
										style={{ width: '300px', height: 'auto' }}
									/>
								) : (
									<div
										style={{ width: '300px', height: '175px' }}
										className="flex items-center justify-center w-full text-2xl text-center rounded h-96 bg-base-100 text-base-content"
									>
										No Poster Image Currently Found
									</div>
								)}
							</figure>
							<div className="select-text card-body">
								<h2 className="text-2xl font-bold">
									Episode {episode.episode_number}: {episode.name}
								</h2>
								<h1 className="italic">
									{episode.vote_average}/10 - {episode.runtime} minutes
								</h1>
								<h1 className="italic">Aired: {episode.air_date} </h1>
								<p>{episode.overview}</p>
								<div className="justify-end card-actions"></div>
							</div>
						</div>

						{user ? (
							<div className="collapse-content">
								<Heart
									showId={show.id}
									seasonNumber={seasonNumber}
									episodeId={episode.id}
									episodeNumber={episode.episode_number}
									showName={show.name}//MESSED WITH THIS
									isHeartClicked={episode.isHeartClicked}
									handleHeartClick={handleHeartClick}
								/>
								<div className="divider" />
								<Notes
									showId={show.id}
                  showName = {show.name}
									episodeData={episode}
									onTagsChange={(newTags) =>
										handleTagsChange(episode.id, newTags)
									}
									onNotesChange={(newNotes) =>
										handleNotesChange(episode.id, newNotes)
									}
									onTagDelete={(episodeId, tagToDelete) =>
										handleTagDelete(episodeId, tagToDelete)
									}
								/>
							</div>
						) : (
							<div className="relative pointer-events-none select-none collapse-content">
								<div className="blur-sm">
									<Heart
										showId={show.id} /*showId doesnt exist within episode*/
										seasonNumber={seasonNumber}
										episodeId={episode.id}
										episodeNumber={episode.episode_number}
										showName={show.name} 
										isHeartClicked={episode.isHeartClicked}
										handleHeartClick={handleHeartClick}
									/>
									<div className="divider" />
									<Notes
										showId={show.id}
                    showName = {show.name}
										episodeData={episode}
										onTagsChange={(newTags) =>
											handleTagsChange(episode.id, newTags)
										}
										onNotesChange={(newNotes) =>
											handleNotesChange(episode.id, newNotes)
										}
										/*dont change the parameters of ontagdelete or else the tags wont delete*/
										onTagDelete={(episodeId, tagToDelete) =>
											handleTagDelete(episodeId, tagToDelete)
										}
									/>
								</div>
								<span className="absolute inset-0 flex items-center justify-center mb-24">
									<span className="text-2xl text-secondary">
										Log in to use this feature
									</span>
								</span>
							</div>
						)}
					</div>
    )))}
			</div>
		</div>
	);
};

export default DisplayEpisodes;
