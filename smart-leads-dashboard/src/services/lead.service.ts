import Lead from "../models/lead.model";

interface GetLeadsQuery {
    page?: string;
    search?: string;
    status?: string;
    source?: string;
    sort?: string;
}

const PAGE_SIZE = 10;

export const createLeadService = async (
    data: object
) => {
    return await Lead.create(data);
};

export const getSingleLeadService = async (
    id: string
) => {
    return await Lead.findById(id);
};

export const updateLeadService = async (
    id: string,
    data: object
) => {
    return await Lead.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        }
    );
};

export const deleteLeadService = async (
    id: string
) => {
    return await Lead.findByIdAndDelete(id);
};

export const getAllLeadsService = async (
    queryParams: GetLeadsQuery
) => {
    const page =
        String(queryParams.page || "1");

    const search =
        String(queryParams.search || "");

    const status =
        queryParams.status
            ? String(queryParams.status)
            : undefined;

    const source =
        queryParams.source
            ? String(queryParams.source)
            : undefined;

    const sort =
        String(queryParams.sort || "latest");
    const pageNumber = Number(page);

    const skip =
        (pageNumber - 1) * PAGE_SIZE;

    const query: Record<string, unknown> = {};

    /*
      FILTER BY STATUS
    */

    if (status) {
        query.status = status;
    }

    /*
      FILTER BY SOURCE
    */

    if (source) {
        query.source = source;
    }

    /*
      PARTIAL SEARCH
      name OR email
    */

    if (search) {
        query.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    /*
      SORTING
    */

    let sortOption = {};

    if (sort === "latest") {
        sortOption = {
            createdAt: -1,
        };
    }

    if (sort === "oldest") {
        sortOption = {
            createdAt: 1,
        };
    }

    /*
      FETCH DATA
    */
    //console.log(query);
    const leads = await Lead.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(PAGE_SIZE);

    /*
      TOTAL DOCUMENTS
    */

    const totalCount =
        await Lead.countDocuments(query);

    /*
      PAGINATION METADATA
    */

    const totalPages = Math.ceil(
        totalCount / PAGE_SIZE
    );

    const hasNextPage =
        pageNumber < totalPages;

    return {
        data: leads,

        pagination: {
            totalCount,
            page: pageNumber,
            totalPages,
            hasNextPage,
        },
    };
};