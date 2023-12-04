import * as React from 'react'
import { Link } from 'gatsby'

export default function CountrySummary({
	id,
	name,
	flag,
	population,
	region,
	capital
}: {
	id: string
	name: string
	flag: string
	population: number
	region: string
	capital: string
}): React.ReactElement {
	return (
		<Link
			className="grid grid-rows-[1fr_auto] bg-element hover:scale-105 hover:outline outline-1 outline-text transition-transform rounded-lg overflow-hidden shadow-md"
			to={id}>
			<img src={flag} />
			<div className="m-4">
				<h2 className="font-bold mb-2">{name}</h2>
				<p>
					<span className="font-semibold">Population: </span>
					{population}
				</p>
				<p>
					<span className="font-semibold">Region: </span>
					{region}
				</p>
				<p>
					<span className="font-semibold">Capital: </span>
					{capital}
				</p>
			</div>
		</Link>
	)
}
