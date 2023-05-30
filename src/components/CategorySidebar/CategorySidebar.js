import React from "react";
import useCategory from "../../hooks/UseCategory/useCategory";
import { Text, NavLink } from "@mantine/core";
import { IconCategory } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

const CategorySidebar = ({ categoryId, setCategory }) => {
  const categories = useCategory();
  const navigate = useNavigate();

  return (
    <>
      <Text weight={600} ml="md" mb="sm" mt="lg">
        Category
      </Text>
      <NavLink
        label="All Books"
        color="cyan"
        icon={<IconCategory size={16} color="blue" />}
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
        })}
        onClick={() => navigate("/book")}
      />
      {categories?.map((item, index) => (
        <NavLink
          key={index}
          active={item._id === categoryId}
          label={item.name}
          icon={<IconCategory size={16} stroke={1.5} color="blue" />}
          onClick={() => {
            setCategory(item._id);
            navigate(`/book/category/${item._id}`);
          }}
          color="cyan"
          sx={(theme) => ({
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
          })}
        />
      ))}
    </>
  );
};

export default CategorySidebar;
