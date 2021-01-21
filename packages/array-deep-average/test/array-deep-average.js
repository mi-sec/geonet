'use strict';

const arrayDeepAverage = require( '..' );
const { expect }       = require( 'chai' );

describe( '@geonet/array-deep-average', () => {
	it( 'should average all param values', () => {
		const a = arrayDeepAverage( 1, 2, 3 );
		const b = arrayDeepAverage( [ 1, 2, 3 ] );
		const c = arrayDeepAverage( [ 1, [ 2, [ 3 ] ] ] );
		expect( a ).to.eq( 2 );
		expect( b ).to.eq( 2 );
		expect( c ).to.eq( 2 );
	} );

	it( 'should average all values in array', () => {
		const data = [ 1, 2, 3 ];
		const n    = arrayDeepAverage( data );
		expect( n ).to.eq( 2 );
	} );

	it( 'should average all values in all nested arrays', () => {
		const data = [ 1, 2, 3, [ 1, 2, 3, [ 1, 2, 3, [ [ 1, 2, 3 ], [ [ 1, 2, [ 1, 2, 3 ] ], 2, 3 ], 3 ] ] ] ];
		const n    = arrayDeepAverage( data );
		expect( n ).to.eq( 2.05 );
	} );

	it( 'should average all values in all nested arrays', () => {
		const data = [ 1, 2, 3, [ 1, 2, 3, [ 1, 2, 3, [ [ 1, 2, 3 ], [ [ 1, 2, [ 1, 2, 3 ] ], 2, 3 ], 3 ] ] ] ];
		const n    = arrayDeepAverage( data, data, [ data ] );
		expect( n ).to.eq( 2.05 );
	} );
} );
