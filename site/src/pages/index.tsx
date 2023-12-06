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

	React.useLayoutEffect(() => {
		document.documentElement.className =
			(typeof window !== 'undefined' && window.localStorage.getItem('theme')) ?? 'light'
	}, [])

	return (
		<Layout>
			<section className="flex flex-wrap justify-between gap-y-8 my-12">
				<div className="flex basis-[36rem] grow gap-2 items-center bg-element rounded-md p-3 shadow-md">
					<svg
						className="mx-2"
						xmlns="http://www.w3.org/2000/svg"
						height="16"
						width="16"
						viewBox="0 0 512 512"
						fill="currentColor">
						<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
					</svg>
					<input className="w-full" placeholder="Search for a country..." />
				</div>
				<div className="flex items-end basis-60 grow-[99]">
					<div className="grow-[99]"></div>
					<div className="basis-52 grow relative rounded-md bg-element">
						<Listbox
							value={selectedRegion}
							onChange={value => {
								setSelectedRegion(value === selectedRegion ? null : value)
							}}>
							<Listbox.Button className="flex items-center justify-between w-full p-3 rounded-md shadow-md">
								{({ open, value }) => {
									return (
										<>
											<p>{value ?? 'Filter by Region'}</p>
											<svg
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												height="16"
												width="14"
												viewBox="0 0 448 512">
												{open ? (
													<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
												) : (
													<path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
												)}
											</svg>
										</>
									)
								}}
							</Listbox.Button>
							<Listbox.Options className="absolute left-0 w-full p-3 z-10 rounded-md mt-1 bg-element shadow-md cursor-pointer">
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
					</div>
				</div>
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
		</Layout>
	)
}

export const Head: HeadFC = () => {
	return (
		<>
			<html lang="en" />
			<body className="bg-background text-text" />
			<title>REST Countries API</title>
		</>
	)
}

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
