import * as React from 'react'
import { Link, graphql, PageProps, HeadFC } from 'gatsby'
import Layout from '../components/layout'

export default function CountryPage({ data: { country } }: PageProps<Queries.CountryPageQuery>): React.ReactElement {
	React.useLayoutEffect(() => {
		document.documentElement.className = localStorage.getItem('theme') ?? 'light'
	}, [])

	return (
		<Layout>
			<Link to="/" className="flex items-center gap-2 rounded-md shadow-md px-8 py-2 my-20 max-w-max bg-element">
				<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" fill="currentColor">
					<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
				</svg>
				<p>Back</p>
			</Link>
			<h1>{country.commonName}</h1>
			<p>{country.nativeName}</p>
			<br />
		</Layout>
	)
}

export const Head: HeadFC<Queries.CountryPageQuery> = ({ data: { country } }) => (
	<>
		<html lang="en" />
		<body className="bg-background text-text" />
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
		}
	}
`
