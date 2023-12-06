import type { GatsbyNode, SourceNodesArgs, NodeInput } from 'gatsby'
import { NODE_TYPES, type ICountryData } from './types'
import crypto from 'node:crypto'

export const sourceNodes: GatsbyNode[`sourceNodes`] = async gatsbyApi => {
	const data = await (
		await fetch(
			'https://restcountries.com/v3.1/all?fields=name,region,subregion,population,capital,currencies,languages,flags'
		)
	).json()

	for (const country of data) {
		const data = {
			commonName: country.name.common,
			nativeName: (Object.values(country.name?.nativeName).at(0) as any)?.common ?? '',
			region: country.region,
			subregion: country.subregion,
			capital: country.capital.at(0),
			population: country.population,
			languages: Object.values(country.languages) as any[],
			flag: country.flags.svg,
			currencies: (Object.values(country.currencies) as any[]).map(o => o.name)
		}
		nodeBuilder({ gatsbyApi, input: data })
	}
}

interface INodeBuilderArgs {
	gatsbyApi: SourceNodesArgs
	input: ICountryData
}

export function nodeBuilder({ gatsbyApi, input }: INodeBuilderArgs) {
	const id = gatsbyApi.createNodeId(`${input.commonName}${crypto.randomUUID()}`)

	const node = {
		...input,
		parent: null,
		children: [],

		// Required fields
		id,
		internal: {
			type: NODE_TYPES.Country,
			contentDigest: gatsbyApi.createContentDigest(input)
		}
	} satisfies NodeInput

	gatsbyApi.actions.createNode(node)
}
