export async function getSpecificProduct(id:String){
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`,{
        next:{
            revalidate:10
        }
    })
    const data = await response.json()
    return data
}