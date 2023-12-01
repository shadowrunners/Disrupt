import { ResolveResponse, ResultTypes } from '../Manager';
import { Track } from '../Models';
import axios from 'axios';

/** This is Disrupt's HTTP source manager. Used for resolving HTTP links. */
export class HTTP {
	public async resolve(query: string, requester: unknown): Promise<ResolveResponse> {
		// Source is mostly going to be used for radio stations, therefore, fetch the ICECAST header data.
		// This only handles AAC encoded playlist streams. No M3U8 stuff yet.

		// TODO: Implement M3U8 support. (probably via query.contains('m3u8') -> use m3u8stream)

		const res = await axios.get(query, { responseType: 'stream' });

		return {
			type: ResultTypes.TRACK,
			info: new Track({
				id: undefined,
				artist: undefined,
				artworkUrl: undefined,
				duration: 0,
				requester,
				source: 'http',
				title: res.headers['icy-name'] ?? 'HTTP Stream',
				uri: query,
			}),
		};
	}
}