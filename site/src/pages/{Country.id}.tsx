import * as React from 'react'
import { Link, graphql, PageProps, HeadFC } from 'gatsby'
import Layout from '../components/layout'

export default function CountryPage({ data: { country } }: PageProps<Queries.CountryPageQuery>): React.ReactElement {
	React.useLayoutEffect(() => {
		document.documentElement.className =
			(typeof window !== 'undefined' && window.localStorage.getItem('theme')) ?? 'light'
	}, [])

	return (
		<Layout>
			<Link to="/" className="flex items-center gap-2 rounded-md shadow-md px-8 py-2 my-20 max-w-max bg-element">
				<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" fill="currentColor">
					<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
				</svg>
				<p>Back</p>
			</Link>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-y-12 gap-x-24">
				<img className="grow w-full" src={country.flag} alt="flag" />
				<div className="grow self-center">
					<h1 className="text-2xl font-bold mb-10">{country.commonName}</h1>
					<div className="grid grid-cols-[repeat(auto-fit,_minmax(40%,_1fr))] gap-y-2 gap-x-4 h-full">
						<p>
							<span className="font-bold">Native Name: </span>
							{country.nativeName}
						</p>
						<p>
							<span className="font-bold">Population: </span>
							{country.population.toLocaleString()}
						</p>
						<p>
							<span className="font-bold">Region: </span>
							{country.region}
						</p>
						<p>
							<span className="font-bold">Sub Region: </span>
							{country.subregion}
						</p>
						<p>
							<span className="font-bold">Capital: </span>
							{country.capital}
						</p>
						<p>
							<span className="font-bold">Currencies: </span>
							{country.currencies.join(', ')}
						</p>
						<p>
							<span className="font-bold">Languages: </span>
							{country.languages.join(', ')}
						</p>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const Head: HeadFC<Queries.CountryPageQuery> = ({ data: { country } }) => (
	<>
		<html lang="en" />
		<body className="bg-background text-text min-w-min" />
		<title>{country.commonName}</title>
	</>
)

export const query = graphql`
	query CountryPage($id: String!) {
		country(id: { eq: $id }) {
			capital
			currencies
			population
			commonName
			nativeName
			languages
			region
			subregion
			flag
		}
	}
`
