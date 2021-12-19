import axios from "axios";
const youtubeEndpoint = `https://www.youtube.com`;

const GetYoutubeInitData = async(url) => {
	var initdata = await {};
	var apiToken = await null;
	var context = await null;
	try {
		const page = await axios.get(encodeURI(url));
		const ytInitData = await page.data.split('var ytInitialData =');
		if (ytInitData && ytInitData.length > 1) {
			const data = await ytInitData[1]
				.split("</script>")[0]
				.slice(0, -1);

			if (page.data.split("innertubeApiKey").length > 0) {
				apiToken = await page.data.split("innertubeApiKey")[1].trim().split(",")[0].split('"')[2];
			}

			if (page.data.split('INNERTUBE_CONTEXT').length > 0) {
				context = await JSON.parse(page.data.split('INNERTUBE_CONTEXT')[1].trim().slice(2, -2));
			}

			initdata = await JSON.parse(data);
			return await Promise.resolve({
				initdata,
				apiToken,
				context
			});
		} else {
			console.error("cannot_get_init_data");
			return await Promise.reject("cannot_get_init_data");
		}
	} catch (ex) {
		await console.error(ex);
		return await Promise.reject(ex);
	}

};

const GetData = async(keyword, withPlaylist = false, limit = 0) => {
	const endpoint = await `${youtubeEndpoint}/results?search_query=${keyword}`;

	try {

		const page = await GetYoutubeInitData(endpoint);

		const sectionListRenderer = await page.initdata.contents
			.twoColumnSearchResultsRenderer
			.primaryContents
			.sectionListRenderer;
const correctedQueryArray = sectionListRenderer.contents[0]?.itemSectionRenderer.contents[0]?.showingResultsForRenderer?.correctedQuery.runs.map(part => {return part.text})
console.log(correctedQueryArray.join(""))
		let contToken = await {};

		let items = await [];

		await sectionListRenderer.contents.forEach(content => {
			if (content.continuationItemRenderer) {
				contToken = content.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
			} else if (content.itemSectionRenderer) {
				content.itemSectionRenderer.contents.forEach((item) => {
					if (item.channelRenderer) {
						let channelRenderer = item.channelRenderer;
						items.push({
							id: channelRenderer.channelId,
							type: 'channel',
							thumbnail: channelRenderer.thumbnail,
							title: channelRenderer.title.simpleText
						});
					} else {
						let videoRender = item.videoRenderer;
						let playListRender = item.playlistRenderer;

						if (videoRender && videoRender.videoId) {
							items.push(VideoRender(item));
						}
						if (withPlaylist) {
							if (playListRender && playListRender.playlistId) {
								items.push({
									id: playListRender.playlistId,
									type: 'playlist',
									thumbnail: playListRender.thumbnails,
									title: playListRender.title.simpleText,
									length: playListRender.videoCount,
									videos: playListRender.videos,
									videoCount: playListRender.videoCount,
									isLive: false
								});
							}
						}
					}
				});
			}
		});
		const apiToken = await page.apiToken;
		const context = await page.context;
		const nextPageContext = await {
			context: context,
			continuation: contToken
		};
		const itemsResult = (limit != 0) ? items.slice(0, limit) : items;
		return await Promise.resolve({
			items: itemsResult,
			nextPage: {
				nextPageToken: apiToken,
				nextPageContext: nextPageContext
			}
		});
	} catch (ex) {
		await console.error(ex);
		return await Promise.reject(ex);
	}
};

const NextPage = async(nextPage, withPlaylist = false, limit = 0) => {
	const endpoint = await `${youtubeEndpoint}/youtubei/v1/search?key=${nextPage.nextPageToken}`;
	try {
		const page = await axios.post(encodeURI(endpoint), nextPage.nextPageContext);
		const item1 = page.data.onResponseReceivedCommands[0].appendContinuationItemsAction;
		let items = [];
		item1.continuationItems.forEach(conitem => {
			if (conitem.itemSectionRenderer) {
				conitem.itemSectionRenderer.contents.forEach((item, index) => {
					let videoRender = item.videoRenderer;
					let playListRender = item.playlistRenderer;
					if (videoRender && videoRender.videoId) {
						items.push(VideoRender(item));
					}
					if (withPlaylist) {
						if (playListRender && playListRender.playlistId) {
							items.push({
								id: playListRender.playlistId,
								type: 'playlist',
								thumbnail: playListRender.thumbnails,
								title: playListRender.title.simpleText,
								length: playListRender.videoCount,
								videos: GetPlaylistData(playListRender.playlistId)
							});
						}
					}
				});
			} else if (conitem.continuationItemRenderer) {
				nextPage.nextPageContext.continuation = conitem.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
			}
		});
		const itemsResult = (limit != 0) ? items.slice(0, limit) : items;
		return await Promise.resolve({
			items: itemsResult,
			nextPage: nextPage
		});
	} catch (ex) {
		await console.error(ex);
		return await Promise.reject(ex);
	}
};

const GetPlaylistData = async(playlistId, limit = 0) => {
	const endpoint = await `${youtubeEndpoint}/playlist?list=${playlistId}`;
	try {
		const initData = await GetYoutubeInitData(endpoint);
		const sectionListRenderer = await initData.initdata;
		const metadata = await sectionListRenderer.metadata;
		if (sectionListRenderer && sectionListRenderer.contents) {
			const videoItems = await sectionListRenderer.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents
			let items = await [];
			await videoItems.forEach(item => {
				let videoRender = item.playlistVideoRenderer;
				if (videoRender && videoRender.videoId) {
					items.push(VideoRender(item));
				}
			});
			const itemsResult = (limit != 0) ? items.slice(0, limit) : items;
			return await Promise.resolve({
				items: itemsResult,
				metadata: metadata
			});
		} else {
			return await Promise.reject("invalid_playlist");
		}
	} catch (ex) {
		await console.error(ex);
		return await Promise.reject(ex);
	}
};

const GetSuggestData = async(limit = 0) => {
	const endpoint = await `${youtubeEndpoint}`;
	try {
		const page = await GetYoutubeInitData(endpoint);
		const sectionListRenderer = await page.initdata.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents;
		let items = await [];
		let otherItems = await [];
		await sectionListRenderer.forEach(item => {
			if (item.richItemRenderer && item.richItemRenderer.content) {
				let videoRender = item.richItemRenderer.content.videoRenderer;
				if (videoRender && videoRender.videoId) {
					items.push(VideoRender(item.richItemRenderer.content));
				} else {
					otherItems.push(videoRender);
				}
			}
		});
		const itemsResult = (limit != 0) ? items.slice(0, limit) : items;
		return await Promise.resolve({
			items: itemsResult
		});
	} catch (ex) {
		await console.error(ex);
		return await Promise.reject(ex);
	};
};

const GetChannelById = async(channelId) => {
	const endpoint = await `${youtubeEndpoint}/channel/${channelId}`;
	try {
		const page = await GetYoutubeInitData(endpoint);
		const tabs = page.initdata.contents.twoColumnBrowseResultsRenderer.tabs;
		const items = tabs.map(json => {
			if (json && json.tabRenderer) {
				const tabRenderer = json.tabRenderer;
				const title = tabRenderer.title;
				const content = tabRenderer.content;
				return {
					title,
					content
				};
			}
		}).filter(y => typeof y != "undefined");
		return await Promise.resolve(items);
	} catch (ex) {
		return await Promise.reject(err);
	}
};

const VideoRender = (json) => {
	try {
		if (json && (json.videoRenderer || json.playlistVideoRenderer)) {
			let videoRenderer = null;
			if (json.videoRenderer) {
				videoRenderer = json.videoRenderer
			} else if (json.playlistVideoRenderer) {
				videoRenderer = json.playlistVideoRenderer
			}
			var isLive = false;
			if (videoRenderer.badges && videoRenderer.badges.length > 0 && videoRenderer.badges[0].metadataBadgeRenderer && videoRenderer.badges[0].metadataBadgeRenderer.style == "BADGE_STYLE_TYPE_LIVE_NOW") {
				isLive = true;
			}
			if (videoRenderer.thumbnailOverlays) {
				videoRenderer.thumbnailOverlays.forEach(item => {
					if (item.thumbnailOverlayTimeStatusRenderer && item.thumbnailOverlayTimeStatusRenderer.style && item.thumbnailOverlayTimeStatusRenderer.style == "LIVE") {
						isLive = true;
					}
				});
			}
			const id = videoRenderer.videoId;
			const thumbnail = videoRenderer.thumbnail;
			const title = videoRenderer.title.runs[0].text;
			const shortBylineText = (videoRenderer.shortBylineText) ? videoRenderer.shortBylineText : '';
			const lengthText = (videoRenderer.lengthText) ? videoRenderer.lengthText : '';
			const channelTitle = (videoRenderer.ownerText && videoRenderer.ownerText.runs) ? videoRenderer.ownerText.runs[0].text : "";
			return {
				id,
				type: 'video',
				thumbnail,
				title,
				channelTitle,
				shortBylineText,
				length: lengthText,
				isLive
			};
		} else {
			return {};
		}
	} catch (ex) {
		throw ex;
	}
};
module.exports =  {GetData, NextPage, GetPlaylistData, GetSuggestData, GetChannelById}
