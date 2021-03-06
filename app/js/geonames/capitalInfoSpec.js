describe('Geonames - capitalInfo', function () {
    var gatewayStub = sinon.stub().returns( { success: function(){} } );
    var countryEntity = {
        countryCode: 'countryCode',
        capital: 'capital'
    };

    beforeEach(module("geonames"));
    afterEach(function () { gatewayStub.reset(); });

    beforeEach(function () {
        module(function($provide){
            $provide.factory('gateway', function(){ return gatewayStub; });
        });
    });


    it('should return a the gateway promise object', function () {
        inject(function ( capitalRequest, gateway ) {
            expect(capitalRequest(countryEntity)).toImplement( gateway() );
        })
    });

    it('should send appropriate params to gateway request', function () {
        inject(function( capitalRequest, CAPITALINFO ){
            var expectedParams = {
                country: countryEntity.countryCode,
                name_equals: countryEntity.capital,
                type: 'json',
                featureCode: 'PPLC'
            };
            capitalRequest(countryEntity);
            expect(gatewayStub).toHaveBeenCalledWith(CAPITALINFO, expectedParams);
        });
    });
});