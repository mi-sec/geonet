'use strict';

const arrayDeepSum = require( '..' );
const { expect }   = require( 'chai' );

describe( '@geonet/array-deep-sum', () => {
	it( 'should add all param values', () => {
		const a = arrayDeepSum( 1, 2, 3 );
		const b = arrayDeepSum( [ 1, 2, 3 ] );
		const c = arrayDeepSum( [ 1, [ 2, [ 3 ] ] ] );
		expect( a ).to.eq( 6 );
		expect( b ).to.eq( 6 );
		expect( c ).to.eq( 6 );
	} );

	it( 'should add all values in array', () => {
		const data = [ 1, 2, 3 ];
		const n    = arrayDeepSum( data );
		expect( n ).to.eq( 6 );
	} );

	it( 'should add all values in all nested arrays', () => {
		const data = [ 1, 2, 3, [ 1, 2, 3, [ 1, 2, 3, [ [ 1, 2, 3 ], [ [ 1, 2, [ 1, 2, 3 ] ], 2, 3 ], 3 ] ] ] ];
		const n    = arrayDeepSum( data );
		expect( n ).to.eq( 41 );
	} );

	it( 'should add all values in all nested arrays', () => {
		const data = [ 1, 2, 3, [ 1, 2, 3, [ 1, 2, 3, [ [ 1, 2, 3 ], [ [ 1, 2, [ 1, 2, 3 ] ], 2, 3 ], 3 ] ] ] ];
		const n    = arrayDeepSum( data, data, [ data ] );
		expect( n ).to.eq( 123 );
	} );
} );
