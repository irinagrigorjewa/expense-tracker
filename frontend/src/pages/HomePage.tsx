import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TransactionForm } from "./transaction/TransactionForm";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutation/user.mutation";
import toast from "react-hot-toast";
import { History } from "./history/History";
import "./HomePage.scss";
import {
  // GET_ALL_TRANSACTIONS,
  GET_TRANSACTION_STATISTICS,
} from "../graphql/queries/transaction.query";
import { Category } from "../types/Category";
import { GET_AUTH_USER } from "../graphql/queries/user.query";

ChartJS.register(ArcElement, Tooltip, Legend);

export const HomePage = () => {
  const { data } = useQuery(GET_TRANSACTION_STATISTICS);
  const { data: authUserData } = useQuery(GET_AUTH_USER);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 99, 132)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 99, 132)",
        ],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });
  const categoryColors: Record<any, any> = {
    saving: "rgba(75, 192, 192)",
    expense: "rgba(54, 162, 235)",
    investment: "rgba(255, 99, 132)",
  };
  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics?.map(
        (stat: Category) => stat.category
      );
      const totalAmounts = data.categoryStatistics?.map(
        (stat: Category) => stat.totalAmount
      );
      const backgroundColors: string[] = [];
      const borderColor: string[] = [];
      categories.forEach((category: string) => {
        backgroundColors.push(categoryColors[category]);
        borderColor.push(categoryColors[category]);
      });
      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor,
          },
        ],
      }));
    }
  }, [data]);
  const [logout, { client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleLogout = async () => {
    try {
      await logout();
      client.clearStore();
      window.location.reload();
    } catch (error) {
      toast.error("Could not log out");
    }
  };
  return (
    <div className="home-page">
      <div className="subtitle-wrapper">
        <h2 className="subtitle">Spend wisely, track wisely</h2>
        <img
          className="profile-picture"
          src={authUserData?.authUser?.profilePicture}
        />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="chart">
        <Doughnut data={chartData} />
      </div>
      <TransactionForm type="create" transaction={null} />
      <History />
    </div>
  );
};
