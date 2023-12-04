import * as React from 'react'
import { Link, graphql, PageProps, HeadFC } from 'gatsby'

export default function CountryPage({ data: { country } }: PageProps<Queries.CountryPageQuery>): React.ReactElement {
	return (
		<main>
			<h1>{country.commonName}</h1>
			<p>{country.nativeName}</p>
			<br />
			<Link to="/">Back to home page</Link>
		</main>
	)
}

export const Head: HeadFC<Queries.CountryPageQuery> = ({ data: { country } }) => (
	<React.Fragment>
		<title>{country.commonName}</title>
		<link
			rel="icon"
			href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🌈</text></svg>"
		/>
	</React.Fragment>
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
