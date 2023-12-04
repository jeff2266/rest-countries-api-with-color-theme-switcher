import * as React from 'react'
import { HeadFC, PageProps, graphql } from 'gatsby'
import { Listbox } from '@headlessui/react'
import CountrySummary from '../components/countrySummary'

export default function IndexPage({
	data: {
		allCountry: { edges }
	}
}: PageProps<Queries.IndexPageQuery>): React.ReactElement {
	const [selectedRegion, setSelectedRegion] = React.useState(null)

	return (
		<>
			<header className="flex justify-between">
				<h1 className="font-extrabold">Where in the world?</h1>
				<button>Dark Mode</button>
			</header>
			<main>
				<section className='flex justify-between'>
					<div>
						<input placeholder='Search for a country...' />
					</div>
					<Listbox></Listbox>
				</section>
				<section className="grid grid-cols-[repeat(auto-fit,_minmax(225px,_1fr))] gap-20 justify-between">
					{edges.map(({ node }) => (
						<CountrySummary
							key={node.id}
							id={node.id}
							name={node.commonName}
							capital={node.capital}
							region={node.region}
							flag={node.flag}
							population={node.population}
						/>
					))}
				</section>
			</main>
		</>
	)
}

export const Head: HeadFC = () => <title>REST Countries API</title>

export const query = graphql`
	query IndexPage {
		allCountry {
			edges {
				node {
					id
					capital
					currencies
					flag
					population
					commonName
					nativeName
					languages
					region
					subregion
				}
			}
		}
	}
`
