import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './ProductsGrid.css';
import { checkImageExistence } from '../../pages/BusinessPage/BusinessPage';


const DEBUG = false;

// Interface for image grid state
interface ProductsGridState {
    images: string[];
    loading: boolean;
    error: string | null;
}

interface ProductsGridProps {
    userId: string | undefined;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ userId }) => {

    // State to hold the image URLs, loading status, and errors
    const [state, setState] = useState<ProductsGridState>({
        images: [],
        loading: true,
        error: null,
    });
    const [imageList, setImageList] = useState<string[]>([]);


    // Get the userID from localStorage
    useEffect(() => {
        const fetchImages = async () => {
            if (!userId) {
                setState({ ...state, error: 'User ID is missing!', loading: false });
                return;
            }

            // retrieves all the images saved within the database
            try {
                const res = await axios.get('http://localhost:8088/blob/');
                if (DEBUG) console.log("blob list:", res.data.blobs);
                const imageList = res.data.blobs;
                let imgs = 0;
                // verifies that the user has an icon image

                const checkImageExistence = () => {
                    console.log("in check image existence products grid");
                    console.log("imgeList", imageList)
                    imageList.forEach((str: { split: (arg0: string) => [any, any]; }) => {
                        const [id, source] = str.split('-');
                        console.log("in loop");
                        if (DEBUG) console.log("id: ", id);
                        if (DEBUG) console.log("source: ", source);
                        console.log("return for product grid: ", id === userId.toString() && source.includes('product'));

                        if (id === userId.toString() && source.includes('product')) {
                            imgs += 1;
                        }
                    })
                }
                checkImageExistence();
                let index = 0;
                let imageUrls: string[] = [];

                while (imgs > 0) {
                    try {
                        // Check if the image exists using axios (you can use fetch, but axios handles errors better)
                        const imageUrl = `http://localhost:8088/blob/${userId}/products${index}`;
                        await axios.get(imageUrl);
                        imageUrls.push(imageUrl);
                        index += 1;
                        imgs -= 1;
                    } catch (error) {
                        // If we hit an error, we assume we've loaded all available images
                        if (DEBUG) console.log("no more image products for userID", userId);
                        break;
                    }


                }

                setImageList(res.data.blobs);
                setState({ images: imageUrls, loading: false, error: null });  // Assuming 'this' context is correct here
                // list = res;
            } catch (err) {
                console.error('Error in getting list of blobs', err);
            }




            // Try to load images until an error occurs (assuming missing image if 404) 

            // const imageUrl = `http://localhost:8088/blob/${userId}/products0`;
            // imageUrls.push(imageUrl)

            // while (imageExists) {

            //     try {
            //         // Check if the image exists using axios (you can use fetch, but axios handles errors better)
            //         imageExists = checkImageExistence(Number(userId), "products" + index)
            //         if (!imageExists) {
            //             break;
            //         }
            //         const imageUrl = `http://localhost:8088/blob/${userId}/products${index}`;
            //         await axios.get(imageUrl);
            //         imageUrls.push(imageUrl);
            //         index += 1;
            //     } catch (error) {
            //         // If we hit an error, we assume we've loaded all available images
            //         if (DEBUG) console.log("no more image products for userID", userId);
            //         break;
            //     }
            // }

            // Update state with the fetched image URLs

        };

        fetchImages();
    }, [userId]);




    const { images, loading, error } = state;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="image-grid">
            {state.images.length > 0 ? (
                <div className="image-gallery">
                    {state.images.map((image, index) => (
                        <img key={index} src={image} alt={`product ${index}`} />
                    ))}
                </div>
            ) : (
                <p>No products</p> // Show "No products" if images list is empty
            )}
        </div>
    );
};

export default ProductsGrid;
