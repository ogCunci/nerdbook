import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "@/components/shared/Loader";
import UsersList from "@/components/shared/UsersList";

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: users, fetchNextPage, hasNextPage } = useGetAllUsers();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  console.log(users);

  if (!users) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>

        {users.pages.map((item, index) => (
          <UsersList users={item.documents} key={`page-${index}`} />
        ))}
      </div>

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
