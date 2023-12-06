import * as React from 'react'
import { Link, graphql, PageProps, HeadFC } from 'gatsby'
import Layout from '../components/layout'

export default function CountryPage({ data: { country } }: PageProps<Queries.CountryPageQuery>): React.ReactElement {
	React.useLayoutEffect(() => {
		document.documentElement.className = localStorage.getItem('theme') ?? 'light'
	}, [])

	return (
		<Layout>
			<main>
				<h1>{country.commonName}</h1>
				<p>{country.nativeName}</p>
				<br />
				<Link to="/">Back to home page</Link>
			</main>
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
