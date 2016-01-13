options( digits = 16 );
library( jsonlite );

x = seq( -170.55, 171.5, length.out=1000 )
y = gamma( x )

cat( y, sep = ",\n" )

write( toJSON( x, digits = 16, auto_unbox = TRUE ), "./test/fixtures/data.json" )
write( toJSON( y, digits = 16, auto_unbox = TRUE ), "./test/fixtures/expected.json" )
