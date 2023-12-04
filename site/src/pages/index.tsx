import * as React from 'react'
import { HeadFC, PageProps, graphql } from 'gatsby'
import { Listbox } from '@headlessui/react'
import CountrySummary from '../components/countrySummary'
import Layout from '../components/layout'

export default function IndexPage({
	data: {
		allCountry: { edges }
	}
}: PageProps<Queries.IndexPageQuery>): React.ReactElement {
	const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null)

	return (
		<Layout>
			<main className="max-w-screen-2xl w-full px-8">
				<section className="flex justify-between my-12">
					<div>
						<input placeholder="Search for a country..." />
					</div>
					<Listbox
						value={selectedRegion}
						onChange={value => {
							setSelectedRegion(value === selectedRegion ? null : value)
						}}>
						<Listbox.Button>{selectedRegion ?? 'Filter by Region'}</Listbox.Button>
						<Listbox.Options>
							{edges
								.map(edge => edge.node)
								.filter((node, i, array) => array.findIndex(o => node.region === o.region) === i)
								.map(({ region }) => (
									<Listbox.Option key={region} value={region}>
										{region}
									</Listbox.Option>
								))}
						</Listbox.Options>
					</Listbox>
				</section>
				<section className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-20 justify-between">
					{edges
						.filter(({ node }) => (selectedRegion ? node.region === selectedRegion : node))
						.map(({ node }) => (
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
		</Layout>
	)
}

export const Head: HeadFC = () => (
	<>
		<html lang="en" />
		<body className="bg-background text-text" />
		<title>REST Countries API</title>
	</>
)

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
